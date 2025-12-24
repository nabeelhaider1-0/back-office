import React, { useEffect, useMemo, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { createMedia, getMedia, updateMedia } from "../../Apis/hotelExtranetApi";
import HotelExtranetMediaForm from "./HotelExtranetMediaForm";
import HotelProfileWizardProgress from "../hotelWizard/HotelProfileWizardProgress";
import {
  ensureWizardActive,
  getWizardStepRef,
  markStepComplete,
  resetWizardState,
  setWizardEditStep,
  setWizardStepRef,
  updateWizardState,
  wouldCompleteAllBlockers,
} from "../hotelWizard/hotelProfileWizardUtils";
import useWizardMode from "../hotelWizard/useWizardMode";
import WizardModeChrome from "../hotelWizard/WizardModeChrome";
import useWizardBackNavigation from "../hotelWizard/useWizardBackNavigation";

const extractMediaId = (res) =>
  res?.data?.id ||
  res?.data?.mediaId ||
  res?.data?.media_id ||
  res?.data?.data?.id ||
  res?.data?.data?.mediaId ||
  res?.data?.data?.media_id ||
  null;

export default function HotelExtranetMediaAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("media", { location, navigate });
  const wizardHotelId = searchParams.get("hotelId") || "";
  const [submitting, setSubmitting] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const [formMode, setFormMode] = useState("create");
  const [initialValue, setInitialValue] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [editingRef, setEditingRef] = useState(null);
  const baseDefaults = useMemo(
    () => (isWizardMode && wizardHotelId ? { hotelId: wizardHotelId } : null),
    [isWizardMode, wizardHotelId],
  );
  const loadMediaDetails = async (mediaId, { showLoader = true } = {}) => {
    if (!mediaId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getMedia(mediaId);
      if (res?.status === 200) {
        setInitialValue(res.data);
        return res.data;
      }
      toast.error(res?.data?.message || "Failed to load media asset");
      return null;
    } catch (_) {
      toast.error("Failed to load media asset");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };
  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "media") {
      updates.currentStep = "media";
    }
    if (wizardHotelId && state.entities?.hotelId !== wizardHotelId) {
      updates.entities = { ...state.entities, hotelId: wizardHotelId };
    }
    if (Object.keys(updates).length) {
      updateWizardState(updates);
    }
  }, [isWizardMode, wizardHotelId, location.search]);
  useEffect(() => {
    if (!isWizardMode) {
      setFormMode("create");
      setInitialValue(null);
      setEditingRef(null);
      setLoadingInitial(false);
      return;
    }
    const state = ensureWizardActive();
    const ref = state.entities?.stepRefs?.media || getWizardStepRef("media");
    if (state.entities?.editStep === "media") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadMediaDetails(ref.id);
        }
      } else {
        toast.error("No previously saved media found to edit");
        setFormMode("create");
        setInitialValue(null);
        setEditingRef(null);
      }
      setWizardEditStep(null);
      return;
    }
    if (!initialValue && ref?.id) {
      setFormMode("edit");
      setEditingRef(ref);
      if (ref.data) {
        setInitialValue(ref.data);
      } else {
        loadMediaDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);
  const handleSubmit = async (payload, intent = "save") => {
    setSubmitting(true);
    try {
      let res;
      if (formMode === "edit" && editingRef?.id) {
        res = await updateMedia(editingRef.id, payload);
        if (res?.status === 200) {
          toast.success("Media asset updated successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const entities = { ...state.entities, hotelId: wizardHotelId || payload.hotel_id || "" };
            setWizardStepRef("media", {
              id: editingRef.id,
              hotelId: entities.hotelId,
            });
            const allBlockersCleared = wouldCompleteAllBlockers("media");
            markStepComplete("media", { entities });
            if (intent === "save-next") {
              if (allBlockersCleared) {
                resetWizardState();
                navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
                return;
              }
              resetWizardState();
              navigate(Constants.URLConstants.HOTELSEXTRANETLIST);
              return;
            } else {
              await loadMediaDetails(editingRef.id, { showLoader: false });
            }
          } else {
            setTimeout(()=>{ window.location.href = Constants.URLConstants.HOTELSEXTRANETMEDIALIST; },300);
          }
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update media asset");
          toast.error(msg);
        }
      } else {
        res = await createMedia(payload);
        const ok = (res && typeof res === 'object' && 'status' in res)
          ? (res.status === 200 || res.status === 201)
          : (res?.success === true || res?.data?.success === true || Boolean(res?.id) || Boolean(res?.data?.id));
        if (ok) {
          toast.success("Media asset created successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const entities = { ...state.entities, hotelId: wizardHotelId || payload.hotel_id || "" };
            const mediaId = extractMediaId(res);
            if (mediaId) {
              setWizardStepRef("media", {
                id: mediaId,
                hotelId: entities.hotelId,
              });
            }
            const allBlockersCleared = wouldCompleteAllBlockers("media");
            markStepComplete("media", { entities });
            if (intent === "save-next") {
              if (allBlockersCleared) {
                resetWizardState();
                navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
                return;
              }
              resetWizardState();
              navigate(Constants.URLConstants.HOTELSEXTRANETLIST);
              return;
            }
          }
          if (!isWizardMode && intent === "save") {
            setTimeout(()=>{ window.location.href = Constants.URLConstants.HOTELSEXTRANETMEDIALIST; },300);
            return;
          }
          setFormResetKey((key) => key + 1);
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to create media asset");
          toast.error(msg);
        }
      }
    } catch (e) { const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to save media asset"); toast.error(msg); }
    setSubmitting(false);
  };
  return (
    <>
      <Header2 title="ADD MEDIA ASSET" linkText1="Media" linkText2="Add Media" link1={Constants.URLConstants.HOTELSEXTRANETMEDIALIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="media"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading media asset…</div>
          ) : (
            <HotelExtranetMediaForm
              key={formResetKey}
              mode={formMode}
              initialValue={initialValue}
              onSubmit={handleSubmit}
              submitting={submitting}
              wizardConfig={isWizardMode ? { isActive: true, continueLabel: "Save & Finish" } : null}
              baseDefaults={baseDefaults}
            />
          )}
        </WizardModeChrome>
      </div>
    </>
  );
}

