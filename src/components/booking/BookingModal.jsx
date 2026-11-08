// ============================================================
// DK ARTS — REUSABLE CENTRAL BOOKING MODAL
// Fullscreen / Drawer modal providing a seamless, single entry point
// for all commission bookings across the website
// ============================================================
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles } from "lucide-react";
import { useBooking } from "../../context/BookingContext.jsx";
import BookingProgress from "./BookingProgress.jsx";
import ArtworkBookingForm from "./ArtworkBookingForm.jsx";
import "./bookingModal.css";

export default function BookingModal() {
  const { isOpen, closeBooking, step, setStep, isDirty } = useBooking();
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) {
      setShowConfirmClose(false);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (isDirty) {
          setShowConfirmClose(true);
        } else {
          closeBooking();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDirty, closeBooking]);

  if (!isOpen) return null;

  function handleRequestClose() {
    if (isDirty && step > 1) {
      setShowConfirmClose(true);
    } else {
      closeBooking();
    }
  }

  function handleConfirmDiscard() {
    setShowConfirmClose(false);
    closeBooking();
  }

  return createPortal(
    <div
      className="bk-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bk-modal-title"
    >
      {/* Background click overlay */}
      <div className="bk-modal-overlay" onClick={handleRequestClose} />

      {/* Main Parchment Modal Container */}
      <div className="bk-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Artistic Corner Burnt Orange Brush Accent */}
        <div className="bk-modal-brush-accent" aria-hidden="true" />

        {/* Modal Header */}
        <div className="bk-modal-header">
          <div className="bk-modal-header-text">
            <div className="bk-modal-eyebrow-row">
              <Sparkles size={13} className="bk-eyebrow-icon" />
              <span className="bk-modal-eyebrow">LET'S CREATE SOMETHING SPECIAL</span>
            </div>
            <h2 id="bk-modal-title" className="bk-modal-title">
              Book Your Artwork
            </h2>
            <p className="bk-modal-lede">
              Commission a bespoke, handmade pencil sketch or custom painting crafted by Deepak Mewada with authentic realism.
            </p>
          </div>

          <button
            type="button"
            className="bk-modal-close-btn"
            onClick={handleRequestClose}
            aria-label="Close booking form"
            data-cursor="hover"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        {/* 5-Step Progress Indicator */}
        <div className="bk-modal-progress-bar-wrap">
          <BookingProgress currentStep={step} onStepClick={(s) => setStep(s)} />
        </div>

        {/* Scrollable Form Body */}
        <div className="bk-modal-scrollable">
          <ArtworkBookingForm />
        </div>

        {/* Discard Changes Confirmation Dialog */}
        {showConfirmClose && (
          <div className="bk-confirm-backdrop">
            <div className="bk-confirm-card bk-fade-in" role="alertdialog">
              <h4 className="bk-confirm-title">Discard Booking Details?</h4>
              <p className="bk-confirm-desc">
                You have unsaved changes in your booking request. Are you sure you want to close this window?
              </p>
              <div className="bk-confirm-actions">
                <button
                  type="button"
                  onClick={() => setShowConfirmClose(false)}
                  className="bk-btn-secondary"
                >
                  Continue Editing
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDiscard}
                  className="bk-btn-danger"
                >
                  Discard &amp; Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
