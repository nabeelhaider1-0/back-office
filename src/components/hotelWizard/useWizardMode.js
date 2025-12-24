import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearWizardFocusMode,
  getStepById,
  getStepByRoute,
  getStoredWizardState,
  getWizardPreference,
  isWizardRoute,
  resetWizardState,
  setWizardPreference,
  startWizardState,
  updateWizardState,
} from "./hotelProfileWizardUtils";

export default function useWizardMode() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const isWizardMode = isWizardRoute(location.pathname, searchParams);
  const [modePreference, setModePreferenceState] = useState(() =>
    getWizardPreference(),
  );
  const prefersWizard = modePreference === "wizard";

  useEffect(() => {
    if (prefersWizard && !isWizardMode) {
      const state = startWizardState();
      const params = new URLSearchParams(location.search);
      params.set("wizard", "1");
      if (state.entities?.hotelId) params.set("hotelId", state.entities.hotelId);
      params.delete("fixMode");
      const qs = params.toString();
      navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true });
    }
  }, [prefersWizard, isWizardMode, location.pathname, location.search, navigate]);

  useEffect(() => {
    if (isWizardMode && modePreference !== "wizard") {
      setModePreferenceState("wizard");
      setWizardPreference("wizard");
    }
  }, [isWizardMode, modePreference]);

  useEffect(() => {
    if (!isWizardMode) return;
    const state = getStoredWizardState();
    const hasFocus =
      Array.isArray(state.entities?.focusSteps) &&
      state.entities.focusSteps.length > 0;
    const hasReturn = Boolean(state.entities?.returnToReadiness);
    const fixModeActive =
      searchParams.get("fixMode") === "1" ||
      location.search.includes("fixMode=1");

    const removeFixMode = () => {
      const params = new URLSearchParams(location.search);
      if (!params.has("fixMode")) return;
      params.delete("fixMode");
      const qs = params.toString();
      navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true });
    };

    if ((hasFocus || hasReturn) && !fixModeActive) {
      clearWizardFocusMode();
      removeFixMode();
    } else if (!hasFocus && !hasReturn && fixModeActive) {
      removeFixMode();
    }
  }, [isWizardMode, location.pathname, location.search, searchParams, navigate]);

  useEffect(() => {
    if (!isWizardMode) return;
    const stepParam = searchParams.get("step");
    if (!stepParam) return;
    const step = getStepById(stepParam);
    if (!step) return;
    if (location.pathname.startsWith(step.route)) return;
    const params = new URLSearchParams(location.search);
    navigate(`${step.route}?${params.toString()}`, { replace: true });
  }, [isWizardMode, location.pathname, location.search, searchParams, navigate]);

  useEffect(() => {
    if (!isWizardMode) return;
    const hotelIdParam = searchParams.get("hotelId");
    if (hotelIdParam) return;
    const state = getStoredWizardState();
    const hasFocus =
      Array.isArray(state.entities?.focusSteps) &&
      state.entities.focusSteps.length > 0;
    const hasReturn = Boolean(state.entities?.returnToReadiness);
    if (hasFocus || hasReturn) return;
    if (!state.entities?.hotelId && !state.completedSteps.length) return;
    updateWizardState({
      currentStep: "hotel",
      completedSteps: [],
      entities: {},
    });
  }, [isWizardMode, location.pathname, location.search, searchParams]);

  useEffect(() => {
    if (!isWizardMode) return;
    const step = getStepByRoute(location.pathname)?.id || "hotel";
    const state = getStoredWizardState();
    if (state.currentStep !== step) {
      updateWizardState({ currentStep: step });
    }
  }, [isWizardMode, location.pathname]);

  const toggleMode = (mode) => {
    if (mode === "wizard") {
      const normalized = setWizardPreference("wizard");
      setModePreferenceState(normalized);
      const state = startWizardState();
      const params = new URLSearchParams(location.search);
      params.set("wizard", "1");
      if (state.entities?.hotelId) params.set("hotelId", state.entities.hotelId);
      params.delete("fixMode");
      const qs = params.toString();
      navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true });
    } else {
      const normalized = setWizardPreference("simple");
      setModePreferenceState(normalized);
      resetWizardState();
      const params = new URLSearchParams(location.search);
      params.delete("wizard");
      params.delete("hotelId");
      params.delete("fixMode");
      const qs = params.toString();
      navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true });
    }
  };

  return {
    isWizardMode,
    toggleMode,
    searchParams,
    location,
    navigate,
  };
}

