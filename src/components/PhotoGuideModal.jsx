import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  CheckCircle2,
  XCircle,
  Camera,
  Sun,
  Smartphone,
  Sparkles,
  X,
  Users,
  Lightbulb,
} from "lucide-react";
import "./photoGuideModal.css";

export default function PhotoGuideModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="pg-backdrop" role="dialog" aria-modal="true" aria-labelledby="pg-title">
      <div className="pg-overlay" onClick={onClose} />

      <div className="pg-card">
        {/* Close Button */}
        <button type="button" className="pg-close-btn" onClick={onClose} aria-label="Close photo guide">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="pg-header">
          <div className="pg-eyebrow-row">
            <span className="pg-eyebrow-badge">REFERENCE GUIDE</span>
            <span className="pg-eyebrow-text">ARTIST TIPS FOR BEST REALISM</span>
          </div>
          <h2 id="pg-title" className="pg-title">
            Choosing the Perfect Reference Photo
          </h2>
          <p className="pg-subtitle">
            Because handmade portraits are drawn stroke-by-stroke, high-quality reference photos allow me to capture micro-details in the eyes, skin texture, and expressions.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="pg-comparison-grid">
          {/* GOOD EXAMPLES */}
          <div className="pg-col pg-col-good">
            <div className="pg-col-header">
              <CheckCircle2 size={18} className="pg-icon-good" />
              <h3>What Works Wonderfully</h3>
            </div>
            <ul className="pg-list">
              <li>
                <strong>Natural Daylight / Window Lighting:</strong> Soft, even light showing genuine contours and depth without harsh shadows.
              </li>
              <li>
                <strong>Sharp, In-Focus Eyes:</strong> The soul of a realistic portrait is in the eyes — visible iris patterns and catchlights make portraits come alive.
              </li>
              <li>
                <strong>Original Uncompressed File:</strong> Photos taken directly from your camera roll (not a screenshot of Instagram or WhatsApp).
              </li>
              <li>
                <strong>Close-Up Angles:</strong> Head &amp; shoulders or bust shot showing clear hair textures and smile lines.
              </li>
            </ul>
          </div>

          {/* CHALLENGING EXAMPLES */}
          <div className="pg-col pg-col-bad">
            <div className="pg-col-header">
              <XCircle size={18} className="pg-icon-bad" />
              <h3>What Makes Detailing Difficult</h3>
            </div>
            <ul className="pg-list">
              <li>
                <strong>Heavy Beauty Filters:</strong> Filters blur away skin tone transitions, nose ridges, and genuine facial structure.
              </li>
              <li>
                <strong>Night / Harsh Flash Glare:</strong> Washes out facial features into flat white highlights and creates unnatural shadows.
              </li>
              <li>
                <strong>Pixelated Screenshots:</strong> Cropped from far-away group photos where zooming in makes the face blurry.
              </li>
              <li>
                <strong>Extreme Backlighting:</strong> Faces completely shadowed against bright sunlight or lamp glare.
              </li>
            </ul>
          </div>
        </div>

        {/* Special Artist Capabilities */}
        <div className="pg-features-box">
          <div className="pg-feature-item">
            <Users size={20} className="pg-feature-icon" />
            <div>
              <strong>Combining Multiple Photos:</strong>
              <span>
                Don't have a picture together? Send individual photos of loved ones or couples, and I will compose them into one harmonious portrait!
              </span>
            </div>
          </div>

          <div className="pg-feature-item">
            <Sparkles size={20} className="pg-feature-icon" />
            <div>
              <strong>Old &amp; Faded Memorial Photos:</strong>
              <span>
                Have an old, damaged, or black-and-white picture of parents or grandparents? I specialize in enhancing and restoring likeness by hand.
              </span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pg-footer">
          <div className="pg-footer-tip">
            <Lightbulb size={16} className="pg-tip-icon" />
            <span>Still unsure? Send 2–3 photos via WhatsApp or the booking form, and I will advise you!</span>
          </div>
          <button type="button" onClick={onClose} className="pg-confirm-btn">
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
