import React, { useEffect, useMemo, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { createRestrictionGlobal, getRestriction, updateRestriction } from "../../Apis/hotelExtranetApi";
import HotelExtranetRestrictionForm from "./HotelExtranetRestrictionForm";
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

const extractRestrictionId = (res) =>
  res?.data?.id ||
  res?.data?.restrictionId ||
  res?.data?.restriction_id ||
  res?.data?.data?.id ||
  res?.data?.data?.restrictionId ||
  res?.data?.data?.restriction_id ||
  null;

export default function HotelExtranetRestrictionsAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("restrictions", { location, navigate });
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
  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  const loadRestrictionDetails = async (restrictionId, { showLoader = true } = {}) => {
    if (!restrictionId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getRestriction(restrictionId);
      if (res) {
        setInitialValue(res);
        return res;
      }
      toast.error("Failed to load restriction details");
      return null;
    } catch (error) {
      toast.error("Failed to load restriction details");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };
  useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "restrictions") {
      updates.currentStep = "restrictions";
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
    const ref = state.entities?.stepRefs?.restrictions || getWizardStepRef("restrictions");
    if (state.entities?.editStep === "restrictions") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadRestrictionDetails(ref.id);
        }
      } else {
        toast.error("No previously saved restriction found to edit");
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
        loadRestrictionDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);

  const handleSubmit = async (payload, intent = "save") => {
    setSubmitting(true);
    try {
      let res;
      if (formMode === "edit" && editingRef?.id) {
        res = await updateRestriction(editingRef.id, payload);
        if (res) {
          toast.success("Restriction updated successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("restrictions");
            const entities = {
              ...state.entities,
              hotelId: wizardHotelId || payload.hotelId || payload.hotel_id || "",
            };
            setWizardStepRef("restrictions", {
              id: editingRef.id,
              hotelId: entities.hotelId,
            });
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("restrictions");
            markStepComplete("restrictions", wizardUpdates);
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
              await loadRestrictionDetails(editingRef.id, { showLoader: false });
            }
          } else {
            setTimeout(() => { window.location.href = Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSLIST; }, 700);
          }
        } else {
          toast.error("Failed to update restriction");
        }
      } else {
        res = await createRestrictionGlobal(payload);
        const ok = res?.status === 201 || res?.status === 200 || res?.data?.success === true;
        if (ok) {
          toast.success("Restriction created successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("restrictions");
            const entities = {
              ...state.entities,
              hotelId: wizardHotelId || payload.hotelId || payload.hotel_id || "",
            };
            const restrictionId = extractRestrictionId(res);
            if (restrictionId) {
              setWizardStepRef("restrictions", {
                id: restrictionId,
                hotelId: entities.hotelId,
              });
            }
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("restrictions");
            markStepComplete("restrictions", wizardUpdates);
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
            setTimeout(() => { window.location.href = Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSLIST; }, 700);
            return;
          }
          setFormResetKey((key) => key + 1);
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to create restriction");
          toast.error(msg);
        }
      }
    } catch (e) {
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to save restriction");
      toast.error(msg);
    }
    setSubmitting(false);
  };
  return (
    <>
      <Header2 title="ADD RESTRICTION" linkText1="Restrictions" linkText2="Add Restriction" link1={Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="restrictions"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading restriction…</div>
          ) : (
            <HotelExtranetRestrictionForm
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


