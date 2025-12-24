import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HOTEL_PROFILE_WIZARD_EVENT,
  HOTEL_PROFILE_WIZARD_STEPS,
} from "./hotelProfileWizardSteps";
import {
  getStepByRoute,
  getStoredWizardState,
  getStepById,
  saveWizardState,
  resetWizardState,
  updateWizardState,
} from "./hotelProfileWizardUtils";
import { setWizardEditStep } from "./hotelProfileWizardUtils";

const statusForStep = (stepId, currentStepId, completedSteps) => {
  if (completedSteps.includes(stepId)) return "done";
  if (stepId === currentStepId) return "active";
  return "pending";
};

export default function HotelProfileWizardProgress({
  className = "",
  showFinishButton = false,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [wizardState, setWizardState] = useState(getStoredWizardState());
  const currentStep = useMemo(
    () =>
      wizardState.currentStep ||
      getStepByRoute(location.pathname)?.id ||
      "hotel",
    [location.pathname, wizardState.currentStep],
  );

  const palette = {
    bg: "#ffffff",
    muted: "#64748b",
    ring: "#e2e8f0",
    // App primary
    primary: "#FF5015",
    primaryDeep: "#e0420c",
    pending: "#e2e8f0",
    ink: "#0f172a",
  };
  const scrollerRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (event?.detail) {
        setWizardState(event.detail);
      } else {
        setWizardState(getStoredWizardState());
      }
    };
    window.addEventListener(HOTEL_PROFILE_WIZARD_EVENT, handler);
    return () => window.removeEventListener(HOTEL_PROFILE_WIZARD_EVENT, handler);
  }, []);

  useEffect(() => {
    const matched = getStepByRoute(location.pathname);
    if (matched && wizardState.currentStep !== matched.id) {
      updateWizardState({ currentStep: matched.id });
    }
  }, [location.pathname, wizardState.currentStep]);

  const stepForId = (stepId) => getStepById(stepId) || HOTEL_PROFILE_WIZARD_STEPS[0];

  const goToStep = (stepId) => {
    const step = getStepById(stepId);
    if (!step) return;
    // If step is completed, set edit mode. Otherwise, just navigate (for current/next step)
    if (wizardState.completedSteps?.includes?.(stepId)) {
      setWizardEditStep(stepId);
    } else {
      setWizardEditStep(null);
    }
    saveWizardState({
      ...wizardState,
      currentStep: stepId,
    });
    const params = new URLSearchParams(location.search);
    params.set("wizard", "1");
    if (wizardState.entities?.hotelId) {
      params.set("hotelId", wizardState.entities.hotelId);
    }
    if (wizardState.entities?.returnToReadiness) {
      params.set("fixMode", "1");
    }
    navigate(`${step.route}?${params.toString()}`);
  };

  const finishWizard = () => {
    resetWizardState();
    navigate(stepForId("hotel").route);
  };

  if (!wizardState?.active) return null;

  const focusSteps =
    Array.isArray(wizardState.entities?.focusSteps) &&
    wizardState.entities.focusSteps.length
      ? wizardState.entities.focusSteps
      : HOTEL_PROFILE_WIZARD_STEPS.map((s) => s.id);
  const visibleSteps = HOTEL_PROFILE_WIZARD_STEPS.filter((s) =>
    focusSteps.includes(s.id),
  );

  const activeIndex = visibleSteps.findIndex((s) => s.id === currentStep);
  const totalFocus = focusSteps.length;
  const completedFocus = focusSteps.filter((id) =>
    wizardState.completedSteps.includes(id),
  ).length;
  const remainingFocus = Math.max(totalFocus - completedFocus, 0);
  
  // Find the last completed step index to determine which steps should be clickable
  let lastCompletedIndex = -1;
  for (let i = visibleSteps.length - 1; i >= 0; i--) {
    if (wizardState.completedSteps.includes(visibleSteps[i].id)) {
      lastCompletedIndex = i;
      break;
    }
  }
  const nextStepAfterCompleted = lastCompletedIndex >= 0 && lastCompletedIndex < visibleSteps.length - 1
    ? visibleSteps[lastCompletedIndex + 1]
    : null;
  
  useEffect(() => {
    const idx = activeIndex >= 0 ? activeIndex : 0;
    const el = document.getElementById(`wiz-step-${idx}`);
    if (el && scrollerRef.current) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div
      className={`wizard-progress-wrapper mb-3 ${className}`}
      onWheel={(e) => {
        e.preventDefault();
        if (!scrollerRef.current) return;
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          scrollerRef.current.scrollBy({
            left: e.deltaY,
            behavior: "smooth",
          });
        } else if (e.deltaX) {
          scrollerRef.current.scrollBy({
            left: e.deltaX,
            behavior: "smooth",
          });
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        const container = scrollerRef.current;
        if (!container) return;
        const startX = e.clientX;
        const startScroll = container.scrollLeft;
        const onMove = (moveEvt) => {
          container.scrollLeft = startScroll - (moveEvt.clientX - startX);
        };
        const onUp = () => {
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      }}
    >
      {/* hide scrollbar but keep scrollability */}
      <style>{`
        .wiz-scroll::-webkit-scrollbar { display: none; }
        .wiz-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 0px rgba(255,80,21,0.0), 0 0 0px rgba(255,80,21,0.0); }
          50% { box-shadow: 0 0 12px rgba(255,80,21,0.35), 0 0 22px rgba(255,80,21,0.25); }
          100% { box-shadow: 0 0 0px rgba(255,80,21,0.0), 0 0 0px rgba(255,80,21,0.0); }
        }
        @keyframes flame {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes flameLick {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: .45; }
          45% { transform: translate(-48%, -56%) scale(1.05); opacity: .7; }
          90% { transform: translate(-50%, -52%) scale(0.85); opacity: .45; }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: .45; }
        }
      `}</style>
      <div
        className="card shadow-sm border-0 rounded-3"
        style={{
          background: palette.bg,
          border: "1px solid #e5e7eb",
        }}
      >
        <div className="card-body py-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>
              <h5 className="mb-0" style={{ fontWeight: 600 }}>
                Build Hotel Profile
              </h5>
              <small className="text-muted" style={{ color: palette.muted }}>
                Step {activeIndex + 1} of {visibleSteps.length}
              </small>
            </div>
            {showFinishButton && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={finishWizard}
              >
                Exit Wizard
              </button>
            )}
          </div>
          {wizardState.entities?.focusSteps?.length ? (
            <div className="alert alert-warning py-2 px-3 mb-3" style={{ fontSize: 13 }}>
              Readiness fix mode: {remainingFocus} of {totalFocus} blockers remaining
            </div>
          ) : null}
          <div
            ref={scrollerRef}
            className="wizard-progress d-flex flex-nowrap align-items-center wiz-scroll"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: 6,
              gap: 0,
            }}
          >
            {visibleSteps.map((step, index) => {
              const status = statusForStep(step.id, currentStep, wizardState.completedSteps);
              // Allow clicking on: completed steps, current step, or the next step after last completed
              const isClickable =
                wizardState.completedSteps.includes(step.id) ||
                step.id === currentStep ||
                (nextStepAfterCompleted && step.id === nextStepAfterCompleted.id);
              const circleBg =
                status === "done"
                  ? palette.primaryDeep
                  : status === "active"
                  ? "#FF6B35" // Brighter, more distinct orange for active step
                  : palette.pending;
              const circleColor = status === "pending" ? "#475569" : "#ffffff";
              const titleColor =
                status === "active"
                  ? "#FF5015" // Use primary color for active step title
                  : status === "pending"
                  ? palette.muted
                  : palette.ink;
              const weight = status === "active" ? 700 : 600;
              const connectorActive =
                index < activeIndex ? true : false;
              return (
                <div
                  key={step.id}
                  className="d-flex align-items-center"
                  style={{
                    flex: "0 0 auto",
                    minWidth: 130,
                    padding: "8px 6px",
                    gap: 10,
                  }}
                  id={`wiz-step-${index}`}
                >
                  {/* Step circle */}
                  <div
                    role={isClickable ? "button" : "group"}
                    tabIndex={isClickable ? 0 : -1}
                    onClick={() => isClickable && goToStep(step.id)}
                    onKeyDown={(e) => {
                      if (!isClickable) return;
                      if (e.key === "Enter" || e.key === " ") goToStep(step.id);
                    }}
                    className="d-flex align-items-center"
                    style={{
                      cursor: isClickable ? "pointer" : "default",
                      gap: 10,
                      opacity: isClickable ? 1 : 0.6,
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (isClickable) {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isClickable) {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        position: "relative",
                        overflow: "hidden",
                        background: circleBg,
                        color: circleColor,
                        fontWeight: 700,
                        boxShadow: status === "active" 
                          ? "0 8px 18px rgba(255,107,53,0.4), 0 0 0 3px rgba(255,107,53,0.15)" 
                          : status === "done"
                          ? "0 2px 8px rgba(224,66,12,0.2)"
                          : "none",
                        border: status === "active"
                          ? `2px solid #FF5015`
                          : status === "pending"
                          ? `1px solid ${palette.ring}`
                          : "none",
                        transition: "transform .15s ease, background .2s ease, box-shadow .2s ease",
                        animation: status === "active" ? "glowPulse 3.6s ease-in-out infinite" : "none",
                        transform: status === "active" ? "scale(1.1)" : "scale(1)",
                      }}
                      aria-label={`Step ${index + 1}: ${step.title}`}
                    >
                      {(status !== "pending") && (
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            content: "''",
                            top: "50%",
                            left: "50%",
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.8), rgba(255,80,21,0.35) 40%, rgba(255,80,21,0) 65%)",
                            filter: "blur(1px)",
                            transform: "translate(-50%, -50%)",
                            animation: "flameLick 3.8s ease-in-out infinite",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                      <span style={{ position: "relative", zIndex: 2 }}>{index + 1}</span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: weight,
                          color: titleColor,
                          lineHeight: 1.1,
                          fontSize: 13,
                        }}
                      >
                        {step.title}
                      </div>
                      <div className="text-muted" style={{ fontSize: 11 }}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {/* Connector */}
                  {index !== HOTEL_PROFILE_WIZARD_STEPS.length - 1 && (
                    <div
                      aria-hidden
                      style={{
                        height: 2,
                        background: connectorActive
                          ? `linear-gradient(90deg, rgba(255,80,21,0.9), rgba(255,80,21,0.35), rgba(255,80,21,0.9))`
                          : palette.ring,
                        backgroundSize: connectorActive ? "200% 200%" : "auto",
                        width: 56,
                        marginLeft: 8,
                        marginRight: 8,
                        borderRadius: 2,
                        transition: "background-color .25s ease",
                        animation: connectorActive ? "flame 5.2s ease-in-out infinite" : "none",
                        position: "relative",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

