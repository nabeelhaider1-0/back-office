import React, { useMemo, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import { createSeason, getSeason, updateSeason } from "../../Apis/hotelExtranetApi";
import HotelExtranetSeasonForm from "./HotelExtranetSeasonForm";
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
const normalizeSeasonResponse = (api = {}) => ({
  ...api,
  start_date: api.start_date || api.startDate || "",
  end_date: api.end_date || api.endDate || "",
});

const buildSeasonPayload = (data = {}) => {
  const { hotelId: _hid, id: _id, timestamps: _ts, start_date, end_date, startDate, endDate, ...rest } = data || {};
  return {
    ...rest,
    start_date: start_date || startDate || "",
    end_date: end_date || endDate || "",
  };
};

const extractSeasonId = (res) =>
  res?.data?.id ||
  res?.data?.seasonId ||
  res?.data?.season_id ||
  res?.data?.data?.id ||
  res?.data?.data?.seasonId ||
  res?.data?.data?.season_id ||
  null;

export default function HotelExtranetSeasonAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    navigate,
    location,
  } = useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("seasons", { location, navigate });
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
  const loadSeasonDetails = async (seasonId, { showLoader = true } = {}) => {
    if (!seasonId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getSeason(seasonId);
      if (res?.status === 200) {
        const normalized = normalizeSeasonResponse(res.data || {});
        setInitialValue(normalized);
        return normalized;
      }
      toast.error(res?.data?.message || "Failed to load season details");
      return null;
    } catch (error) {
      toast.error("Failed to load season details");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };
  React.useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "seasons") {
      updates.currentStep = "seasons";
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
    const ref = state.entities?.stepRefs?.seasons || getWizardStepRef("seasons");
    if (state.entities?.editStep === "seasons") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadSeasonDetails(ref.id);
        }
      } else {
        toast.error("No previously saved season found to edit");
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
        loadSeasonDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);

  const submitCreate = async (data, intent) => {
    const targetHotelId = data.hotelId || wizardHotelId;
    if (!targetHotelId) {
      toast.error("Hotel is required");
      return;
    }
    const payload = buildSeasonPayload(data);
    try {
      const res = await createSeason(targetHotelId, payload);
      if (res?.status === 201 || res?.status === 200) {
        toast.success("Season created successfully");
        if (isWizardMode) {
          const state = ensureWizardActive();
          const nextStep = getNextWizardStep("seasons");
          const seasonId = extractSeasonId(res);
          const entities = {
            ...state.entities,
            hotelId: wizardHotelId || targetHotelId,
            stepRefs: {
              ...(state.entities?.stepRefs || {}),
              seasons: {
                ...(state.entities?.stepRefs?.seasons || {}),
                id: seasonId || state.entities?.stepRefs?.seasons?.id || null,
                hotelId: wizardHotelId || targetHotelId,
              },
            },
          };
          const wizardUpdates = { entities };
          if (seasonId) {
            setWizardStepRef("seasons", {
              id: seasonId,
              hotelId: wizardHotelId || targetHotelId,
              data: { ...payload, id: seasonId, hotelId: targetHotelId },
            });
          }
          if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
          const allBlockersCleared = wouldCompleteAllBlockers("seasons");
          markStepComplete("seasons", wizardUpdates);
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
          setTimeout(() => {
            window.location.href = Constants.URLConstants.HOTELSEXTRANETSEASONSLIST;
          }, 300);
          return;
        }
        setFormResetKey((key) => key + 1);
      } else {
        const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
        const msg = Array.isArray(raw) ? raw.join(", ") : raw || "Failed to create season";
        toast.error(msg);
      }
    } catch (e) {
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : raw || "Failed to create season";
      toast.error(msg);
    }
  };

  const submitUpdate = async (data, intent) => {
    if (!editingRef?.id) {
      toast.error("Unable to determine which season to update");
      return;
    }
    const payload = buildSeasonPayload(data);
    try {
      const res = await updateSeason(editingRef.id, payload);
      if (res?.status === 200) {
        toast.success("Season updated successfully");
        const state = ensureWizardActive();
        setWizardStepRef("seasons", {
          id: editingRef.id,
          hotelId: wizardHotelId || data.hotelId || state.entities?.hotelId || "",
          data: { ...payload, id: editingRef.id, hotelId: data.hotelId || wizardHotelId },
        });
        if (isWizardMode) {
          const nextStep = getNextWizardStep("seasons");
          const entities = {
            ...state.entities,
            hotelId: wizardHotelId || state.entities?.hotelId || data.hotelId || "",
            stepRefs: {
              ...(state.entities?.stepRefs || {}),
              seasons: {
                ...(state.entities?.stepRefs?.seasons || {}),
                id: editingRef.id,
                hotelId: wizardHotelId || state.entities?.hotelId || data.hotelId || "",
              },
            },
          };
          const wizardUpdates = { entities };
          if (intent === "save-next" && nextStep) wizardUpdates.currentStep = nextStep.id;
          const allBlockersCleared = wouldCompleteAllBlockers("seasons");
          markStepComplete("seasons", wizardUpdates);
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
            await loadSeasonDetails(editingRef.id, { showLoader: false });
          }
        } else {
          window.location.href = Constants.URLConstants.HOTELSEXTRANETSEASONSLIST;
        }
      } else {
        const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
        const msg = Array.isArray(raw) ? raw.join(", ") : raw || "Failed to update season";
        toast.error(msg);
      }
    } catch (e) {
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : raw || "Failed to update season";
      toast.error(msg);
    }
  };

  const handleSubmit = async (data, intent = "save") => {
    setSubmitting(true);
    try {
      if (formMode === "edit" && editingRef?.id) {
        await submitUpdate(data, intent);
      } else {
        await submitCreate(data, intent);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header2 title="ADD SEASON" linkText1="Seasons" linkText2="Add Season" link1={Constants.URLConstants.HOTELSEXTRANETSEASONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="seasons"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading season…</div>
          ) : (
            <HotelExtranetSeasonForm
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
