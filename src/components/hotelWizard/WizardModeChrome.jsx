import React, { useEffect, useState } from "react";
import WizardGuideAssistant from "./WizardGuideAssistant";

export default function WizardModeChrome({
  isWizardMode,
  onToggle,
  progress,
  children,
  primaryColor = "#FF5015",
  guideStepId,
  canGoBack = false,
  onBack,
}) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 420);
    return () => clearTimeout(timer);
  }, [isWizardMode]);

  const handleToggle = (mode) => {
    onToggle && onToggle(mode);
  };

  return (
    <>
      <style>{`
        .mode-toggle-track {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(90px,1fr));
          background: #f8f9fb;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 999px;
          padding: 3px;
          overflow: hidden;
        }
        .mode-toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: calc(50% - 3px);
          height: calc(100% - 6px);
          border-radius: 999px;
          background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC);
          box-shadow: 0 6px 16px rgba(255,80,21,0.35);
          transition: transform .35s cubic-bezier(.65,.05,.36,1);
        }
        .mode-toggle-thumb.left { transform: translateX(0); }
        .mode-toggle-thumb.right { transform: translateX(calc(100% + 6px)); }
        .mode-toggle-btn {
          position: relative;
          z-index: 1;
          border: none;
          background: transparent;
          padding: 6px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          transition: color .25s ease;
        }
        .mode-toggle-btn.active { color: #ffffff; }
        .wizard-animate-shell {
          transition: opacity .45s ease, transform .45s ease;
        }
        .wizard-animate-shell.enter { opacity: 1; transform: translateY(0); }
        .wizard-animate-shell.exit { opacity: 0; transform: translateY(-12px); }
        .wizard-mode-shell {
          position: relative;
        }
        .wizard-mode-shell.animating .wizard-mode-form {
          transition: transform .45s ease, opacity .45s ease;
        }
        .wizard-mode-header-glow {
          height: 4px;
          background: linear-gradient(90deg, transparent, ${primaryColor}55, transparent);
          border-radius: 999px;
          margin-bottom: 12px;
          transition: opacity .3s ease;
        }
      `}</style>
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2" style={{ gap: 12 }}>
        <div className="flex-grow-1 position-relative" style={{ overflow: "hidden" }}>
          <div className={`wizard-animate-shell ${isWizardMode ? "enter" : "exit"}`}>
            {isWizardMode && progress}
          </div>
        </div>
        {isWizardMode && canGoBack ? (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={onBack}
            style={{
              minWidth: 110,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              borderColor: primaryColor,
              color: primaryColor,
            }}
          >
            <span aria-hidden className="me-1">←</span>
            Back
          </button>
        ) : null}
      </div>
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="text-muted" style={{ fontSize: 13, fontWeight: 500 }}>Mode</span>
        <div className="mode-toggle-track" role="group" aria-label="Mode selection">
          <span className={`mode-toggle-thumb ${isWizardMode ? "right" : "left"}`} />
          <button
            type="button"
            className={`mode-toggle-btn ${!isWizardMode ? "active" : ""}`}
            onClick={() => handleToggle("simple")}
          >
            Simple
          </button>
          <button
            type="button"
            className={`mode-toggle-btn ${isWizardMode ? "active" : ""}`}
            onClick={() => handleToggle("wizard")}
          >
            Wizard
          </button>
        </div>
      </div>
      <div className={`wizard-mode-shell ${animating ? "animating" : ""}`}>
        <div
          className="wizard-mode-header-glow"
          style={{ opacity: isWizardMode ? 1 : 0 }}
        />
        <div
          className="wizard-mode-form"
          style={{
            transition: "transform .45s ease, opacity .45s ease",
            transform: animating && !isWizardMode ? "translateY(12px)" : "translateY(0)",
            opacity: animating && !isWizardMode ? 0 : 1,
          }}
        >
          {children}
        </div>
      </div>
      {guideStepId ? <WizardGuideAssistant stepId={guideStepId} isWizardMode={isWizardMode} /> : null}
    </>
  );
}

