import React, { useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import assistantAnimation from "../../assets/lottie/wizardGuideAssistant.json";
import { getGuideForStep } from "./wizardGuideContent";

const STORAGE_KEY = "hotelWizardGuideDismissedSteps";

const loadDismissed = () => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch (_) {
    return new Set();
  }
};

const saveDismissed = (steps) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(steps)));
  } catch (_) {
    /* ignore */
  }
};

export default function WizardGuideAssistant({ stepId, isWizardMode = false }) {
  const guide = getGuideForStep(stepId, isWizardMode);
  const [dismissedSteps, setDismissedSteps] = useState(() => loadDismissed());
  const initiallyDismissed = useMemo(() => dismissedSteps.has(stepId), [dismissedSteps, stepId]);
  const [isOpen, setIsOpen] = useState(() => !initiallyDismissed);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    if (!guide || !isOpen) return undefined;
    let frame = 0;
    const chars = guide.message;
    const timer = window.setInterval(() => {
      frame += 1;
      setDisplayedText(chars.slice(0, frame));
      if (frame >= chars.length) {
        window.clearInterval(timer);
      }
    }, 28);
    return () => window.clearInterval(timer);
  }, [guide, isOpen, stepId, isWizardMode]);

  if (!guide) return null;

  const handleClose = () => {
    setIsOpen(false);
    setDisplayedText("");
    setDismissedSteps((prev) => {
      const next = new Set(prev);
      next.add(stepId);
      saveDismissed(next);
      return next;
    });
  };

  const handleReopen = () => {
    setDismissedSteps((prev) => {
      const next = new Set(prev);
      next.delete(stepId);
      saveDismissed(next);
      return next;
    });
    setIsOpen(true);
  };

  const shouldShowReopen = !isOpen;

  return (
    <>
      <style>{`
        @keyframes float-bounce {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(-12px) rotate(-1deg); }
          75% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 1; }
        }
        @keyframes slide-bounce {
          0% { transform: translateX(150%) scale(0.8) rotate(-5deg); opacity: 0; }
          60% { transform: translateX(-5%) scale(1.02) rotate(2deg); opacity: 1; }
          80% { transform: translateX(2%) scale(0.98) rotate(-1deg); }
          100% { transform: translateX(0) scale(1) rotate(0deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 
              0 20px 60px rgba(15,23,42,0.15),
              0 8px 24px rgba(15,23,42,0.1),
              0 0 0 1px rgba(148,163,184,0.1);
          }
          50% { 
            box-shadow: 
              0 24px 70px rgba(15,23,42,0.18),
              0 10px 30px rgba(15,23,42,0.12),
              0 0 0 1px rgba(148,163,184,0.15);
          }
        }
        @keyframes sparkle-rotate {
          0% { transform: rotate(0deg) scale(1); opacity: 0.6; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.6; }
        }
        @keyframes typing-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .wizard-guide-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1100;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: opacity .4s ease, transform .4s ease;
          animation: slide-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .wizard-guide-container.hidden {
          pointer-events: none;
          opacity: 0;
          transform: translateY(40px) scale(0.85) rotate(5deg);
        }
        .wizard-guide-card {
          position: relative;
          background: #ffffff;
          border-radius: 20px;
          padding: 26px 26px 32px 26px;
          box-shadow: 
            0 25px 80px rgba(15,23,42,0.12),
            0 10px 40px rgba(15,23,42,0.08),
            0 4px 16px rgba(15,23,42,0.06),
            inset 0 1px 0 rgba(255,255,255,0.9);
          border: 1px solid rgba(226,232,240,0.6);
          display: flex;
          gap: 22px;
          overflow: visible;
          position: relative;
        }
        .wizard-guide-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            #3b82f6 0%,
            #6366f1 30%,
            #8b5cf6 60%,
            #a855f7 100%
          );
          border-radius: 20px 20px 0 0;
          z-index: 1;
        }
        .wizard-guide-card::after {
          content: "";
          position: absolute;
          bottom: -16px;
          right: 100px;
          width: 0;
          height: 0;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 16px solid #ffffff;
          filter: drop-shadow(0 4px 12px rgba(15,23,42,0.1));
          z-index: 0;
        }
        .wizard-guide-close {
          position: absolute;
          top: 18px;
          right: 18px;
          border: none;
          background: rgba(241,245,249,0.9);
          color: #64748b;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06);
          font-weight: 300;
        }
        .wizard-guide-close:hover {
          background: rgba(226,232,240,1);
          color: #334155;
          transform: rotate(90deg) scale(1.08);
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }
        .wizard-guide-close:active {
          transform: rotate(90deg) scale(1.05);
        }
        .wizard-guide-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-right: 8px;
        }
        .wizard-guide-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #0f172a;
          letter-spacing: -0.4px;
          line-height: 1.25;
          position: relative;
        }
        .wizard-guide-title::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 55px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #6366f1, transparent);
          border-radius: 2px;
        }
        .wizard-guide-text {
          font-size: 14.5px;
          color: #475569;
          line-height: 1.75;
          min-height: 68px;
          white-space: pre-line;
          transition: color .2s ease;
          font-weight: 400;
          position: relative;
        }
        .wizard-guide-text::after {
          content: "|";
          color: #6366f1;
          animation: typing-cursor 1s infinite;
          margin-left: 3px;
          font-weight: 300;
        }
        .wizard-guide-tips {
          margin: 16px 0 0;
          padding-left: 0;
          color: #475569;
          font-size: 13.5px;
          list-style: none;
        }
        .wizard-guide-tips li {
          margin-bottom: 11px;
          position: relative;
          padding-left: 30px;
          line-height: 1.75;
          font-weight: 400;
        }
        .wizard-guide-tips li::before {
          content: "•";
          position: absolute;
          left: 8px;
          top: 0;
          font-size: 18px;
          color: #6366f1;
          font-weight: 700;
          line-height: 1.75;
        }
        .wizard-guide-lottie {
          flex-shrink: 0;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float-bounce 3.5s ease-in-out infinite;
          filter: drop-shadow(0 6px 16px rgba(99,102,241,0.2));
          position: relative;
        }
        .wizard-guide-lottie::before {
          content: "";
          position: absolute;
          width: 115%;
          height: 115%;
          border-radius: 50%;
          background: radial-gradient(circle, 
            rgba(99,102,241,0.12) 0%,
            rgba(139,92,246,0.08) 40%,
            transparent 70%
          );
          animation: pulse-ring 2.5s ease-in-out infinite;
          z-index: -1;
        }
        .wizard-guide-backdrop {
          position: fixed;
          inset: 0;
          background: transparent;
          z-index: 1099;
        }
        .wizard-guide-reopen {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          left: auto !important;
          z-index: 1099;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          padding: 13px 22px;
          box-shadow: 
            0 6px 20px rgba(99,102,241,0.35),
            0 3px 10px rgba(99,102,241,0.25),
            inset 0 1px 0 rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.4px;
          position: relative;
        }
        .wizard-guide-reopen:hover {
          box-shadow: 
            0 8px 24px rgba(99,102,241,0.45),
            0 4px 14px rgba(99,102,241,0.35),
            inset 0 1px 0 rgba(255,255,255,0.25);
          transform: translateY(-3px);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }
        .wizard-guide-reopen:active {
          transform: translateY(-1px);
        }
        @media (max-width: 575px) {
          .wizard-guide-container {
            right: 16px !important;
            left: auto !important;
            max-width: calc(100% - 32px);
            bottom: 16px;
          }
          .wizard-guide-reopen {
            right: 16px !important;
            left: auto !important;
            bottom: 16px !important;
          }
          .wizard-guide-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 24px;
          }
          .wizard-guide-card::after {
            display: none;
          }
          .wizard-guide-lottie {
            width: 180px;
            height: 180px;
          }
          .wizard-guide-body {
            padding-right: 0;
          }
        }
      `}</style>
      {isOpen && <div className="wizard-guide-backdrop" onClick={handleClose} />}
      <div className={`wizard-guide-container ${isOpen ? "" : "hidden"}`}>
        <div className="wizard-guide-card">
          <button type="button" className="wizard-guide-close" aria-label="Close assistant" onClick={handleClose}>
            ×
          </button>
          <div className="wizard-guide-lottie" aria-hidden="true">
            <Lottie animationData={assistantAnimation} loop autoplay />
          </div>
          <div className="wizard-guide-body">
            <div className="wizard-guide-title">{guide.title}</div>
            <div className="wizard-guide-text">{displayedText}</div>
            {guide.tips?.length ? (
              <ul className="wizard-guide-tips">
                {guide.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      {shouldShowReopen && (
        <button type="button" className="wizard-guide-reopen" onClick={handleReopen}>
          Need Help?
        </button>
      )}
    </>
  );
}

