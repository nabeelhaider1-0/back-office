import React, { useEffect, useMemo, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { createPromotion, getPromotion, updatePromotion } from "../../Apis/hotelExtranetApi";
import HotelExtranetPromotionForm from "./HotelExtranetPromotionForm";
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

const extractPromotionId = (res) =>
  res?.data?.id ||
  res?.data?.promotionId ||
  res?.data?.promotion_id ||
  res?.data?.data?.id ||
  res?.data?.data?.promotionId ||
  res?.data?.data?.promotion_id ||
  null;

export default function HotelExtranetPromotionsAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("promotions", { location, navigate });
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
  const loadPromotionDetails = async (promotionId, { showLoader = true } = {}) => {
    if (!promotionId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getPromotion(promotionId);
      if (res?.status === 200) {
        setInitialValue(res.data);
        return res.data;
      }
      toast.error(res?.data?.message || "Failed to load promotion");
      return null;
    } catch (_) {
      toast.error("Failed to load promotion");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };

  useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "promotions") {
      updates.currentStep = "promotions";
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
    const ref = state.entities?.stepRefs?.promotions || getWizardStepRef("promotions");
    if (state.entities?.editStep === "promotions") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadPromotionDetails(ref.id);
        }
      } else {
        toast.error("No previously saved promotion found to edit");
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
        loadPromotionDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);
  const handleSubmit = async (payload, intent = "save") => {
    setSubmitting(true);
    try {
      let res;
      if (formMode === "edit" && editingRef?.id) {
        res = await updatePromotion(editingRef.id, payload);
        if (res?.status === 200) {
          toast.success("Promotion updated successfully");
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("promotions");
            const entities = {
              ...state.entities,
              hotelId: wizardHotelId || payload.hotel_id || "",
            };
            setWizardStepRef("promotions", {
              id: editingRef.id,
              hotelId: entities.hotelId,
            });
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("promotions");
            markStepComplete("promotions", wizardUpdates);
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
              await loadPromotionDetails(editingRef.id, { showLoader: false });
            }
          } else {
            setTimeout(()=>{ window.location.href = Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST; },300);
          }
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update promotion");
          toast.error(msg);
        }
      } else {
        res = await createPromotion(payload.contract_id || "", payload);
        const ok = (res && typeof res === 'object' && 'status' in res)
          ? (res.status === 200 || res.status === 201)
          : (res?.success === true || res?.data?.success === true || Boolean(res?.id) || Boolean(res?.data?.id));
        if (ok) {
          toast.success("Promotion created successfully");
          const promotionId = extractPromotionId(res);
          if (isWizardMode) {
            const state = ensureWizardActive();
            const nextStep = getNextWizardStep("promotions");
            const entities = {
              ...state.entities,
              hotelId: wizardHotelId || payload.hotel_id || "",
            };
            if (promotionId) {
              setWizardStepRef("promotions", {
                id: promotionId,
                hotelId: entities.hotelId,
              });
            }
            const wizardUpdates = { entities };
            if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
            const allBlockersCleared = wouldCompleteAllBlockers("promotions");
            markStepComplete("promotions", wizardUpdates);
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
            setTimeout(()=>{ window.location.href = Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST; },300);
            return;
          }
          setFormResetKey((key) => key + 1);
        } else {
          const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
          const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to create promotion");
          toast.error(msg);
        }
      }
    } catch (e) { const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to save promotion"); toast.error(msg); }
    setSubmitting(false);
  };
  return (
    <>
      <Header2 title="ADD PROMOTION" linkText1="Promotions" linkText2="Add Promotion" link1={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="promotions"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading promotion…</div>
          ) : (
            <HotelExtranetPromotionForm
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


