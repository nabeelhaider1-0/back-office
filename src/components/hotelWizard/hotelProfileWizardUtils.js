import {
  HOTEL_PROFILE_WIZARD_EVENT,
  HOTEL_PROFILE_WIZARD_STORAGE_KEY,
  HOTEL_PROFILE_WIZARD_STEPS,
} from "./hotelProfileWizardSteps";

const defaultState = {
  active: false,
  currentStep: "hotel",
  completedSteps: [],
  entities: {},
};

export const HOTEL_PROFILE_WIZARD_PREF_KEY = "hotel_extranet_profile_wizard_pref";

const clone = (value) => JSON.parse(JSON.stringify(value));

const STEP_ID_SET = new Set(HOTEL_PROFILE_WIZARD_STEPS.map((step) => step.id));

const normalizeStepIds = (stepIds = []) =>
  Array.from(
    new Set(
      stepIds.filter((stepId) => typeof stepId === "string" && STEP_ID_SET.has(stepId)),
    ),
  );

const sanitizeWizardState = (state) => {
  const merged = {
    ...clone(defaultState),
    ...(state && typeof state === "object" ? state : {}),
  };

  merged.completedSteps = normalizeStepIds(merged.completedSteps || []);

  const entities =
    merged.entities && typeof merged.entities === "object" ? { ...merged.entities } : {};

  const focusSteps = normalizeStepIds(entities.focusSteps || []);
  if (focusSteps.length) {
    const outstandingFocus = focusSteps.filter(
      (stepId) => !merged.completedSteps.includes(stepId),
    );
    if (outstandingFocus.length) {
      entities.focusSteps = outstandingFocus;
    } else {
      delete entities.focusSteps;
      delete entities.returnToReadiness;
      merged.completedSteps = [];
      merged.currentStep = "hotel";
    }
  } else if (entities.focusSteps) {
    delete entities.focusSteps;
  }

  merged.entities = Object.keys(entities).length ? entities : {};
  merged.active = Boolean(merged.active);
  merged.currentStep = merged.currentStep || "hotel";

  return merged;
};

export const getStoredWizardState = () => {
  try {
    const raw = window.sessionStorage.getItem(HOTEL_PROFILE_WIZARD_STORAGE_KEY);
    if (!raw) return clone(defaultState);
    const parsed = JSON.parse(raw);
    return sanitizeWizardState(parsed);
  } catch (_) {
    return clone(defaultState);
  }
};

export const saveWizardState = (nextState) => {
  const sanitized = sanitizeWizardState(nextState);
  window.sessionStorage.setItem(
    HOTEL_PROFILE_WIZARD_STORAGE_KEY,
    JSON.stringify(sanitized),
  );
  window.dispatchEvent(
    new CustomEvent(HOTEL_PROFILE_WIZARD_EVENT, { detail: sanitized }),
  );
  return sanitized;
};

export const resetWizardState = () => {
  window.sessionStorage.removeItem(HOTEL_PROFILE_WIZARD_STORAGE_KEY);
  const cleared = clone(defaultState);
  window.dispatchEvent(
    new CustomEvent(HOTEL_PROFILE_WIZARD_EVENT, { detail: cleared }),
  );
  return cleared;
};

export const startWizardState = () => {
  const current = getStoredWizardState();
  if (current.active) return current;
  const initial = {
    ...clone(defaultState),
    active: true,
    currentStep: "hotel",
  };
  return saveWizardState(initial);
};

export const updateWizardState = (updates) => {
  const current = getStoredWizardState();
  const next = {
    ...current,
    ...updates,
  };
  return saveWizardState(next);
};

export const markStepComplete = (stepId, extra = {}) => {
  const current = getStoredWizardState();
  const completed = Array.from(new Set([...current.completedSteps, stepId]));
  const updatedState = updateWizardState({
    completedSteps: completed,
    ...extra,
  });
  return updatedState;
};

/**
 * Checks if completing the given stepId would clear all blockers
 * This should be called BEFORE markStepComplete to check if this is the last blocker
 * @param {string} stepId - The step being completed
 * @returns {boolean} true if completing this step would clear all blockers, false otherwise
 */
export const wouldCompleteAllBlockers = (stepId) => {
  const state = getStoredWizardState();
  const focusSteps = Array.isArray(state.entities?.focusSteps) && state.entities.focusSteps.length
    ? state.entities.focusSteps
    : [];
  if (!focusSteps.length) return false; // No blockers mode
  if (!Boolean(state.entities?.returnToReadiness)) return false; // Not in blocker mode
  // Check if this step is in the focusSteps and if completing it would finish all blockers
  if (!focusSteps.includes(stepId)) return false;
  const wouldBeCompleted = Array.from(new Set([...state.completedSteps, stepId]));
  const allCompleted = focusSteps.every((stepId) => wouldBeCompleted.includes(stepId));
  return allCompleted;
};

export const isWizardRoute = (pathname, searchParams) => {
  if (!pathname) return false;
  const hasQuery = searchParams?.get?.("wizard") === "1";
  if (hasQuery) return true;
  const stored = getStoredWizardState();
  return stored.active && HOTEL_PROFILE_WIZARD_STEPS.some(
    (step) => pathname.startsWith(step.route),
  );
};

export const getNextWizardStep = (currentStepId) => {
  const state = getStoredWizardState();
  const focusSteps =
    Array.isArray(state.entities?.focusSteps) &&
    state.entities.focusSteps.length
      ? state.entities.focusSteps
      : HOTEL_PROFILE_WIZARD_STEPS.map((s) => s.id);
  const index = focusSteps.findIndex((id) => id === currentStepId);
  if (index === -1 || index === focusSteps.length - 1) return null;
  const nextId = focusSteps[index + 1];
  return (
    HOTEL_PROFILE_WIZARD_STEPS.find((step) => step.id === nextId) ||
    HOTEL_PROFILE_WIZARD_STEPS[index + 1] ||
    null
  );
};

export const getPreviousWizardStep = (currentStepId) => {
  const state = getStoredWizardState();
  const focusSteps =
    Array.isArray(state.entities?.focusSteps) &&
    state.entities.focusSteps.length
      ? state.entities.focusSteps
      : HOTEL_PROFILE_WIZARD_STEPS.map((s) => s.id);
  const index = focusSteps.findIndex((id) => id === currentStepId);
  if (index <= 0) return null;
  const prevId = focusSteps[index - 1];
  return (
    HOTEL_PROFILE_WIZARD_STEPS.find((step) => step.id === prevId) ||
    HOTEL_PROFILE_WIZARD_STEPS[index - 1] ||
    null
  );
};

export const getStepByRoute = (pathname) =>
  HOTEL_PROFILE_WIZARD_STEPS.find((step) => pathname.startsWith(step.route));

export const getStepById = (stepId) =>
  HOTEL_PROFILE_WIZARD_STEPS.find((step) => step.id === stepId);

export const ensureWizardActive = () => {
  const stored = getStoredWizardState();
  if (!stored.active) {
    return startWizardState();
  }
  return stored;
};

export const setWizardEditStep = (stepId) => {
  const state = getStoredWizardState();
  const entities = { ...(state.entities || {}) };
  if (stepId) {
    entities.editStep = stepId;
  } else if (entities.editStep) {
    delete entities.editStep;
  }
  return updateWizardState({ entities });
};

export const getWizardStepRef = (stepId) => {
  const state = getStoredWizardState();
  return state.entities?.stepRefs?.[stepId] || null;
};

export const setWizardStepRef = (stepId, ref = {}) => {
  if (!stepId) return getStoredWizardState();
  const state = getStoredWizardState();
  const entities = { ...(state.entities || {}) };
  const stepRefs = { ...(entities.stepRefs || {}) };
  stepRefs[stepId] = {
    ...(stepRefs[stepId] || {}),
    ...ref,
  };
  entities.stepRefs = stepRefs;
  return updateWizardState({ entities });
};

export const clearWizardFocusMode = () => {
  const state = getStoredWizardState();
  const hasFocus =
    Array.isArray(state.entities?.focusSteps) &&
    state.entities.focusSteps.length;
  const hasReturn = Boolean(state.entities?.returnToReadiness);
  if (!hasFocus && !hasReturn) return state;
  const cleanedEntities = { ...(state.entities || {}) };
  delete cleanedEntities.focusSteps;
  delete cleanedEntities.returnToReadiness;
  const next = {
    ...state,
    completedSteps: [],
    entities: Object.keys(cleanedEntities).length ? cleanedEntities : {},
  };
  return saveWizardState(next);
};

export const getWizardPreference = () => {
  try {
    const stored = window.localStorage.getItem(HOTEL_PROFILE_WIZARD_PREF_KEY);
    return stored === "wizard" ? "wizard" : "simple";
  } catch (_) {
    return "simple";
  }
};

export const setWizardPreference = (mode) => {
  try {
    const normalized = mode === "wizard" ? "wizard" : "simple";
    window.localStorage.setItem(HOTEL_PROFILE_WIZARD_PREF_KEY, normalized);
    return normalized;
  } catch (_) {
    return "simple";
  }
};

