import React, { useMemo, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { createRate, createRatesBulk, getRate, updateRate } from "../../Apis/hotelExtranetApi";
import HotelExtranetRateForm from "./HotelExtranetRateForm";
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

const extractRateId = (res) =>
  res?.data?.id ||
  res?.data?.rateId ||
  res?.data?.rate_id ||
  (Array.isArray(res?.data) && res.data[0]?.id) ||
  res?.data?.data?.id ||
  null;

export default function HotelExtranetRateAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("rates", { location, navigate });
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
  React.useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  const loadRateDetails = async (rateId, { showLoader = true } = {}) => {
    if (!rateId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getRate(rateId);
      if (res) {
        setInitialValue(res);
        return res;
      }
      toast.error("Failed to load rate");
      return null;
    } catch (_) {
      toast.error("Failed to load rate");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };
  React.useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "rates") {
      updates.currentStep = "rates";
    }
    if (wizardHotelId && state.entities?.hotelId !== wizardHotelId) {
      updates.entities = { ...state.entities, hotelId: wizardHotelId };
    }
    if (Object.keys(updates).length) {
      updateWizardState(updates);
    }
  }, [isWizardMode, wizardHotelId, location.search]);
  React.useEffect(() => {
    if (!isWizardMode) {
      setFormMode("create");
      setInitialValue(null);
      setEditingRef(null);
      setLoadingInitial(false);
      return;
    }
    const state = ensureWizardActive();
    const ref = state.entities?.stepRefs?.rates || getWizardStepRef("rates");
    if (state.entities?.editStep === "rates") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref?.data) {
          setInitialValue(ref.data);
        } else {
          loadRateDetails(ref.id);
        }
      } else {
        toast.error("No previously saved rate found to edit");
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
        loadRateDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);

  const handleSubmit = async (data, intent = "save") => {
    setSubmitting(true);
    const payload = data || {};
    try {
      const { contractId } = payload;
      if (!contractId) {
        toast.error("Contract is required");
        return;
      }
      let res;
      if (formMode === "edit" && editingRef?.id) {
        if (Array.isArray(payload.items) && payload.items.length > 1) {
          toast.error("Editing multiple rates at once is not supported");
          return;
        }
        res = await updateRate(editingRef.id, payload);
        if (res?.status === 200) {
          toast.success("Rate updated successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("rates");
            const entities = {
              ...state.entities,
              hotelId: wizardHotelId || state.entities?.hotelId || payload.hotelId || "",
            };
            setWizardStepRef("rates", {
              id: editingRef.id,
              contractId,
              data: payload,
            });
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("rates");
            markStepComplete("rates", wizardUpdates);
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
              setInitialValue(payload);
            }
          } else {
            setTimeout(() => { window.location.href = Constants.URLConstants.HOTELSEXTRANETRATESLIST; }, 300);
          }
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update rate");
          toast.error(msg);
        }
      } else {
        try { console.log("RateAdd submit payload", payload); } catch {}
        const { items } = payload;
        if (Array.isArray(items) && items.length) {
          res = await createRatesBulk(contractId, items);
        } else {
          const { items: _items, ...single } = payload;
          res = await createRate(contractId, single);
        }
        try { console.log("RateAdd response", res); } catch {}
        if (res?.status === 201 || res?.status === 200) {
          toast.success("Rate created successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("rates");
            const entities = {
              ...state.entities,
              hotelId: wizardHotelId || payload.hotelId || "",
            };
            const rateId = extractRateId(res);
            if (rateId) {
              setWizardStepRef("rates", {
                id: rateId,
                contractId,
                data: payload,
              });
            }
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("rates");
            markStepComplete("rates", wizardUpdates);
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
                if (state.entities?.returnToReadiness) params.set("fixMode", "1");
                setFormResetKey((key) => key + 1);
                navigate(`${nextStep.route}?${params.toString()}`);
                return;
              }
            }
          }
          if (!isWizardMode && intent === "save") {
            setTimeout(() => { window.location.href = Constants.URLConstants.HOTELSEXTRANETRATESLIST; }, 300);
            return;
          }
          setFormResetKey((key) => key + 1);
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to create rate");
          toast.error(msg);
        }
      }
    } catch (e) {
      try { console.error("RateAdd error", e); } catch {}
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to save rate");
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header2 title="ADD RATE" linkText1="Rates" linkText2="Add Rate" link1={Constants.URLConstants.HOTELSEXTRANETRATESLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="rates"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading rate…</div>
          ) : (
            <HotelExtranetRateForm
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
