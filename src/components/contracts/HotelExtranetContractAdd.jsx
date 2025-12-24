import React, { useEffect, useMemo, useRef, useState } from "react";
import { createContract, listHotels, getContract, updateContract } from "../../Apis/hotelExtranetApi";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import HotelExtranetContractForm from "./HotelExtranetContractForm";
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

const normalizeContractResponse = (api = {}) => ({
  ...api,
  hotelId: api.hotelId || api.hotel_id || "",
  name: api.name || api.display_name || "",
  contract_code: api.contract_code || api.contractCode || api.code || "",
  start_date: api.start_date || api.startDate || "",
  end_date: api.end_date || api.endDate || "",
  effective_from: api.effective_from || api.effectiveFrom || "",
  effective_to: api.effective_to || api.effectiveTo || "",
});

const buildContractPayload = (data = {}) => {
  const { hotelId, __intent, contract_code, ...rest } = data || {};
  const payload = { ...rest };
  if (contract_code) {
    payload.contract_code = contract_code;
  }
  return { hotelId, payload };
};

const extractContractId = (res) =>
  res?.data?.id ||
  res?.data?.contractId ||
  res?.data?.contract_id ||
  res?.data?.data?.id ||
  res?.data?.data?.contractId ||
  res?.data?.data?.contract_id ||
  null;

export default function HotelExtranetContractAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("contracts", { location, navigate });
  const wizardHotelId = searchParams.get("hotelId") || "";
  const [submitting, setSubmitting] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const [formMode, setFormMode] = useState("create");
  const [initialValue, setInitialValue] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [editingRef, setEditingRef] = useState(null);
  React.useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "contracts") {
      updates.currentStep = "contracts";
    }
    if (wizardHotelId && state.entities?.hotelId !== wizardHotelId) {
      updates.entities = { ...state.entities, hotelId: wizardHotelId };
    }
    if (Object.keys(updates).length) {
      updateWizardState(updates);
    }
  }, [isWizardMode, wizardHotelId, location.search]);
  const baseDefaults = useMemo(
    () => (isWizardMode && wizardHotelId ? { hotelId: wizardHotelId } : null),
    [isWizardMode, wizardHotelId],
  );
  const loadContractDetails = async (contractId, { showLoader = true } = {}) => {
    if (!contractId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getContract(contractId);
      if (res?.status === 200) {
        const normalized = normalizeContractResponse(res.data || {});
        setInitialValue(normalized);
        return normalized;
      }
      toast.error(res?.data?.message || "Failed to load contract");
      return null;
    } catch (error) {
      toast.error("Failed to load contract");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };

  useEffect(() => {
    if (!isWizardMode) {
      setFormMode("create");
      setInitialValue(null);
      setEditingRef(null);
      setLoadingInitial(false);
      return;
    }
    const state = ensureWizardActive();
    const ref = state.entities?.stepRefs?.contracts || getWizardStepRef("contracts");
    if (state.entities?.editStep === "contracts") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadContractDetails(ref.id);
        }
      } else {
        toast.error("No previously saved contract found to edit");
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
        loadContractDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);

  const submitCreate = async (data) => {
    const intent = data?.__intent || "save";
    const { hotelId, __intent, ...payload } = data;
    const targetHotelId = hotelId || wizardHotelId;
    if (!targetHotelId) {
      toast.error("Hotel is required");
      return { intent, success: false };
    }
    try { console.log("AddContract submit payload", data); } catch {}
    const res = await createContract(targetHotelId, payload);
    try { console.log("AddContract response", res); } catch {}
    if (res?.status === 201 || res?.status === 200) {
      toast.success("Contract created successfully");
      const contractId = extractContractId(res);
      if (isWizardMode) {
        const state = ensureWizardActive();
        const nextStep = getNextWizardStep("contracts");
        const entities = {
          ...state.entities,
          hotelId: wizardHotelId || targetHotelId,
        };
        setWizardStepRef("contracts", {
          id: contractId,
          hotelId: wizardHotelId || targetHotelId,
        });
        const wizardUpdates = { entities };
        if (intent === "save-next" && nextStep) {
          wizardUpdates.currentStep = nextStep.id;
        }
        const allBlockersCleared = wouldCompleteAllBlockers("contracts");
        markStepComplete("contracts", wizardUpdates);
        if (intent === "save-next") {
          if (allBlockersCleared) {
            resetWizardState();
            setFormResetKey((key) => key + 1);
            navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
            return { intent, success: true, advance: false };
          }
          if (nextStep) {
            const params = new URLSearchParams();
            params.set("wizard", "1");
            if (entities.hotelId) params.set("hotelId", entities.hotelId);
            if (state.entities?.returnToReadiness) params.set("fixMode", "1");
            setFormResetKey((key) => key + 1);
            navigate(`${nextStep.route}?${params.toString()}`);
            return { intent, success: true, advance: true };
          }
        }
      }
      if (!isWizardMode && intent === "save") {
        window.location.href = Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST;
        return { intent, success: true, advance: false };
      }
      setFormResetKey((key) => key + 1);
      return { intent, success: true };
    }
    toast.error(res?.data?.message || "Failed to create contract");
    return { intent, success: false };
  };

  const submitUpdate = async (data) => {
    if (!editingRef?.id) {
      toast.error("Unable to determine which contract to update");
      return { success: false };
    }
    const { hotelId: _hid, __intent, ...payload } = data || {};
    try {
      const res = await updateContract(editingRef.id, payload);
      if (res?.status === 200) {
        toast.success("Contract updated successfully");
        if (isWizardMode) {
          const state = ensureWizardActive();
          const nextStep = getNextWizardStep("contracts");
          const entities = {
            ...state.entities,
            hotelId: state.entities?.hotelId || wizardHotelId || payload.hotelId || "",
          };
          setWizardStepRef("contracts", {
            id: editingRef.id,
            hotelId: entities.hotelId,
          });
          const wizardUpdates = { entities };
          if (__intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
          const allBlockersCleared = wouldCompleteAllBlockers("contracts");
          markStepComplete("contracts", wizardUpdates);
          if (__intent === "save-next") {
            if (allBlockersCleared) {
              resetWizardState();
              navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
              return { success: true, advance: false };
            }
            if (nextStep) {
              const params = new URLSearchParams();
              params.set("wizard", "1");
              if (entities.hotelId) params.set("hotelId", entities.hotelId);
              if (state.entities?.returnToReadiness) params.set("fixMode", "1");
              navigate(`${nextStep.route}?${params.toString()}`);
              return { success: true, advance: true };
            }
          } else {
            await loadContractDetails(editingRef.id, { showLoader: false });
          }
        } else {
          window.location.href = Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST;
        }
        return { success: true };
      }
      toast.error(res?.data?.message || "Failed to update contract");
      return { success: false };
    } catch (error) {
      toast.error("Failed to update contract");
      return { success: false };
    }
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    const intent = data?.__intent || "save";
    try {
      if (formMode === "edit" && editingRef?.id) {
        await submitUpdate({ ...data, __intent: intent });
      } else {
        await submitCreate({ ...data, __intent: intent });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Header2 title="ADD CONTRACT" linkText1="Contracts" linkText2="Add Contract" link1={Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST} link2={Constants.URLConstants.HOTELSEXTRANETCONTRACTSADD} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="contracts"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading contract…</div>
          ) : (
            <HotelExtranetContractForm
              key={formResetKey}
              mode={formMode}
              initialValue={initialValue}
              onSubmit={(payload, intent) => handleSubmit({ ...payload, __intent: intent })}
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
