import React, { useEffect, useMemo, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { upsertAllotmentsBulk, getAllotment, updateAllotment } from "../../Apis/hotelExtranetApi";
import HotelExtranetAllotmentForm from "./HotelExtranetAllotmentForm";
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

const extractAllotmentId = (res) =>
  res?.data?.id ||
  res?.data?.allotmentId ||
  res?.data?.allotment_id ||
  (Array.isArray(res?.data?.items) && res.data.items[0]?.id) ||
  null;

export default function HotelExtranetAllotmentsAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("allotments", { location, navigate });
  const wizardHotelId = searchParams.get("hotelId") || "";
  const [submitting, setSubmitting] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const [formMode, setFormMode] = useState("create");
  const [initialValue, setInitialValue] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [editingRef, setEditingRef] = useState(null);
  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "allotments") {
      updates.currentStep = "allotments";
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
    const ref = state.entities?.stepRefs?.allotments || getWizardStepRef("allotments");
    if (state.entities?.editStep === "allotments") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadAllotmentDetails(ref.id);
        }
      } else {
        toast.error("No previously saved allotment found to edit");
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
        loadAllotmentDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);
  const baseDefaults = useMemo(
    () => (isWizardMode && wizardHotelId ? { hotelId: wizardHotelId } : null),
    [isWizardMode, wizardHotelId],
  );
  const loadAllotmentDetails = async (allotmentId, { showLoader = true } = {}) => {
    if (!allotmentId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getAllotment(allotmentId);
      if (res) {
        setInitialValue(res);
        return res;
      }
      toast.error("Failed to load allotment");
      return null;
    } catch (_) {
      toast.error("Failed to load allotment");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };

  const handleSubmit = async (data, intent = "save") => {
    setSubmitting(true);
    try {
      const { contractId, items, hotelId } = data || {};
      let res;
      if (formMode === "edit" && editingRef?.id) {
        if (Array.isArray(items) && items.length > 1) {
          toast.error("Editing multiple allotments at once is not supported in wizard mode");
          return;
        }
        res = await updateAllotment(editingRef.id, { ...items?.[0], contractId });
        if (res) {
          toast.success("Allotment updated successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("allotments");
            const entities = { ...state.entities, hotelId: wizardHotelId || hotelId || "" };
            setWizardStepRef("allotments", {
              id: editingRef.id,
              contractId,
              hotelId: entities.hotelId,
            });
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("allotments");
            markStepComplete("allotments", wizardUpdates);
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
              await loadAllotmentDetails(editingRef.id, { showLoader: false });
            }
          } else {
            setTimeout(() => { window.location.href = Constants.URLConstants?.HOTELSEXTRANETALLOTMENTSLIST || "/"; }, 300);
          }
        }
      } else {
        res = await upsertAllotmentsBulk(contractId, items);
        if (res?.status === 200 || res?.status === 201) {
          toast.success("Allotments upserted successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("allotments");
            const entities = { ...state.entities, hotelId: wizardHotelId || hotelId || "" };
            const allotmentId = extractAllotmentId(res);
            if (allotmentId) {
              setWizardStepRef("allotments", {
                id: allotmentId,
                contractId,
                hotelId: entities.hotelId,
              });
            }
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("allotments");
            markStepComplete("allotments", wizardUpdates);
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
            setTimeout(() => { window.location.href = Constants.URLConstants?.HOTELSEXTRANETALLOTMENTSLIST || "/"; }, 300);
            return;
          }
          setFormResetKey((key) => key + 1);
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to upsert allotments");
          toast.error(msg);
        }
      }
    } catch (e) {
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to upsert allotments");
      toast.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="ADD ALLOTMENTS" linkText1="Allotments" linkText2="Add Allotments" link1={Constants.URLConstants?.HOTELSEXTRANETALLOTMENTSLIST || "/"} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="allotments"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading allotments…</div>
          ) : (
            <HotelExtranetAllotmentForm
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


