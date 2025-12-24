import { useCallback, useMemo } from "react";
import {
  ensureWizardActive,
  getPreviousWizardStep,
  updateWizardState,
} from "./hotelProfileWizardUtils";

const buildParamsWithWizardContext = (locationSearch, entities = {}) => {
  const params = new URLSearchParams(locationSearch || "");
  params.set("wizard", "1");
  if (entities.hotelId) params.set("hotelId", entities.hotelId);
  else params.delete("hotelId");
  if (entities.returnToReadiness) params.set("fixMode", "1");
  else params.delete("fixMode");
  if (!params.get("contractId") && entities.stepRefs?.contracts?.id) {
    params.set("contractId", entities.stepRefs.contracts.id);
  }
  return params;
};

export default function useWizardBackNavigation(stepId, { location, navigate }) {
  const previousStep = useMemo(
    () => getPreviousWizardStep(stepId),
    [stepId, location?.pathname, location?.search],
  );
  const canGoBack = Boolean(previousStep);

  const handleBack = useCallback(() => {
    if (!previousStep) return;
    const state = ensureWizardActive();
    const entities = { ...(state.entities || {}) };
    entities.editStep = previousStep.id;
    const params = buildParamsWithWizardContext(location?.search, entities);
    updateWizardState({
      currentStep: previousStep.id,
      entities,
    });
    navigate(`${previousStep.route}?${params.toString()}`);
  }, [previousStep, location?.search, navigate]);

  return {
    canGoBack,
    handleBack,
    previousStep,
  };
}

