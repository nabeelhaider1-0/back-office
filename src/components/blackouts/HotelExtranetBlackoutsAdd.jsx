import React, { useEffect, useMemo, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { createBlackout, getBlackout, updateBlackout } from "../../Apis/hotelExtranetApi";
import HotelExtranetBlackoutForm from "./HotelExtranetBlackoutForm";
import HotelProfileWizardProgress from "../hotelWizard/HotelProfileWizardProgress";
import {
  ensureWizardActive,
  getNextWizardStep,
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

const extractBlackoutId = (res) =>
  res?.data?.id ||
  res?.data?.blackoutId ||
  res?.data?.blackout_id ||
  res?.data?.data?.id ||
  res?.data?.data?.blackoutId ||
  res?.data?.data?.blackout_id ||
  null;

export default function HotelExtranetBlackoutsAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("blackouts", { location, navigate });
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
  const loadBlackoutDetails = async (blackoutId, { showLoader = true } = {}) => {
    if (!blackoutId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getBlackout(blackoutId);
      if (res) {
        setInitialValue(res);
        return res;
      }
      toast.error("Failed to load blackout");
      return null;
    } catch (_) {
      toast.error("Failed to load blackout");
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
    if (state.currentStep !== "blackouts") {
      updates.currentStep = "blackouts";
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
    const ref = state.entities?.stepRefs?.blackouts || getWizardStepRef("blackouts");
    if (state.entities?.editStep === "blackouts") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadBlackoutDetails(ref.id);
        }
      } else {
        toast.error("No previously saved blackout found to edit");
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
        loadBlackoutDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);
  const handleSubmit = async (payload, intent = "save") => {
    setSubmitting(true);
    try {
      let res;
      if (formMode === "edit" && editingRef?.id) {
        res = await updateBlackout(editingRef.id, payload);
        if (res) {
          toast.success("Blackout updated successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("blackouts");
            const entities = { ...state.entities, hotelId: wizardHotelId || payload.hotel_id || "" };
            setWizardStepRef("blackouts", {
              id: editingRef.id,
              hotelId: entities.hotelId,
            });
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("blackouts");
            markStepComplete("blackouts", wizardUpdates);
            if (intent === "save-next") {
              if (allBlockersCleared) {
                resetWizardState();
                navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
                return;
              }
              if (nextStep) {
                const params = new URLSearchParams();
                params.set("wizard", "1");
                if (entities.hotelId) params.set("hotelId", entities.hotelId);
                if (state.entities?.returnToReadiness) params.set("fixMode", "1");
                navigate(`${nextStep.route}?${params.toString()}`);
                return;
              }
            } else {
              await loadBlackoutDetails(editingRef.id, { showLoader: false });
            }
          } else {
            setTimeout(()=>{ window.location.href = Constants.URLConstants.HOTELSEXTRANETBLACKOUTSLIST; },300);
          }
        } else {
          toast.error("Failed to update blackout");
        }
      } else {
        res = await createBlackout(payload.hotel_id ? payload.hotel_id : "", payload);
        const ok = (res && typeof res === 'object' && 'status' in res)
          ? (res.status === 200 || res.status === 201)
          : (res?.success === true || res?.data?.success === true || Boolean(res?.id) || Boolean(res?.data?.id));
        if (ok) {
          toast.success("Blackout created successfully");
          const blackoutId = extractBlackoutId(res);
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("blackouts");
            const entities = { ...state.entities, hotelId: wizardHotelId || payload.hotel_id || "" };
            if (blackoutId) {
              setWizardStepRef("blackouts", {
                id: blackoutId,
                hotelId: entities.hotelId,
              });
            }
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("blackouts");
            markStepComplete("blackouts", wizardUpdates);
            if (intent === "save-next") {
              if (allBlockersCleared) {
                resetWizardState();
                setFormResetKey((key) => key + 1);
                navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
                return;
              }
              if (nextStep) {
                const params = new URLSearchParams();
                params.set("wizard", "1");
                if (entities.hotelId) params.set("hotelId", entities.hotelId);
                if (state.entities?.returnToReadiness) {
                  params.set("fixMode", "1");
                }
                setFormResetKey((key) => key + 1);
                navigate(`${nextStep.route}?${params.toString()}`);
                return;
              }
            }
          }
          if (!isWizardMode && intent === "save") {
            setTimeout(()=>{ window.location.href = Constants.URLConstants.HOTELSEXTRANETBLACKOUTSLIST; },300);
            return;
          }
          setFormResetKey((key) => key + 1);
        }
        else { const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to create blackout"); toast.error(msg); }
      }
    } catch (e) { const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to save blackout"); toast.error(msg); }
    setSubmitting(false);
  };
  return (
    <>
      <Header2 title="ADD BLACKOUT" linkText1="Blackouts" linkText2="Add Blackout" link1={Constants.URLConstants.HOTELSEXTRANETBLACKOUTSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="blackouts"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading blackout…</div>
          ) : (
            <HotelExtranetBlackoutForm
              key={formResetKey}
              mode={formMode}
              initialValue={initialValue}
              onSubmit={handleSubmit}
              submitting={submitting}
              wizardConfig={isWizardMode ? { isActive: true } : null}
              baseDefaults={baseDefaults}
            />
          )}
        </WizardModeChrome>
      </div>
    </>
  );
}


