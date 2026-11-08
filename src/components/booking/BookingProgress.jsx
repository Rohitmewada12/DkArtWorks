// ============================================================
// DK ARTS — BOOKING FORM PROGRESS INDICATOR
// Artistic multi-step navigation bar with active indicators
// ============================================================
import { Check } from "lucide-react";

export const FORM_STEPS = [
  { id: 1, title: "Contact", label: "Your Details" },
  { id: 2, title: "Artwork", label: "Art Specs" },
  { id: 3, title: "Budget", label: "Budget & Date" },
  { id: 4, title: "Finishing", label: "Frame & Gift" },
  { id: 5, title: "Submit", label: "Review & Send" },
];

export default function BookingProgress({ currentStep, onStepClick, maxAccessibleStep = 5 }) {
  return (
    <div className="bk-progress-wrap" aria-label="Booking steps">
      <div className="bk-progress-line" aria-hidden="true">
        <div
          className="bk-progress-fill"
          style={{ width: `${((currentStep - 1) / (FORM_STEPS.length - 1)) * 100}%` }}
        />
      </div>

      <div className="bk-steps-list" role="tablist">
        {FORM_STEPS.map((s) => {
          const isCompleted = s.id < currentStep;
          const isActive = s.id === currentStep;
          const isAccessible = s.id <= maxAccessibleStep;

          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Step ${s.id}: ${s.title}`}
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick && onStepClick(s.id)}
              className={`bk-step-node ${isActive ? "is-active" : ""} ${
                isCompleted ? "is-completed" : ""
              }`}
            >
              <div className="bk-step-circle">
                {isCompleted ? (
                  <Check size={13} strokeWidth={3} className="bk-check-icon" />
                ) : (
                  <span>{s.id}</span>
                )}
              </div>
              <span className="bk-step-title">{s.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
