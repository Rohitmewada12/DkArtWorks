import { useState, useId } from "react";
import { Check, Gift, Star, User } from "lucide-react";
import { GIFT_PACKAGES, OCCASIONS } from "../data/giftPackages.js";
import useReveal from "../useReveal.js";
import "./giftWrapping.css";

export default function GiftWrapping({ onSelectGift }) {
  const ref = useReveal({ threshold: 0.08 });
  const [enabled, setEnabled] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState("premium");
  const [occasion, setOccasion] = useState("Birthday");
  const [recipientName, setRecipientName] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [error, setError] = useState("");

  const checkboxId = useId();
  const packageSelectId = useId();
  const occasionSelectId = useId();
  const recipientInputId = useId();
  const messageInputId = useId();

  const selectedPackage =
    GIFT_PACKAGES.find((p) => p.id === selectedPackageId) || GIFT_PACKAGES[1];

  function handleCardClick(pkgId) {
    setSelectedPackageId(pkgId);
    if (!enabled) {
      setEnabled(true);
    }
    setError("");
  }

  function handleContinue(e) {
    e.preventDefault();

    if (enabled) {
      if (!recipientName.trim()) {
        setError("Please enter the recipient's name to personalize the gift tag.");
        const el = document.getElementById(recipientInputId);
        if (el) el.focus();
        return;
      }
    }

    setError("");

    const giftDetails = enabled
      ? {
          enabled: true,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          price: selectedPackage.price,
          priceDisplay: selectedPackage.priceDisplay,
          occasion,
          recipientName: recipientName.trim(),
          personalMessage: personalMessage.trim(),
        }
      : {
          enabled: false,
        };

    // Notify parent or dispatch custom window event for Contact form integration
    if (onSelectGift) {
      onSelectGift(giftDetails);
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("dkarts:gift_selected", { detail: giftDetails })
      );

      // Smooth scroll to contact / commission enquiry section
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <section
      ref={ref}
      className="reveal gift-section"
      aria-label="DK Arts — Gift Wrapping & Presentation"
    >
      {/* Decorative Upper-Left Dry-Brush Accent */}
      <div className="gift-bg-decor-topleft" aria-hidden="true" />

      {/* ============================================================
          SECTION HEADER
          ============================================================ */}
      <div className="gift-header">
        {/* Hand-Drawn Gift Box Sketch Icon with Radiating Rays */}
        <div className="gift-icon-wrap" aria-hidden="true">
          <img
            src="/gallery/gift-box-sketch-icon.png"
            alt=""
            className="gift-icon-img"
          />
        </div>

        {/* Main Section Heading: Gift Wrapping & Presentation */}
        <h2 className="gift-title">
          <span className="gift-title-main">Gift Wrapping &amp; </span>
          <span className="gift-title-cursive">Presentation</span>
        </h2>

        {/* Subtitle with Flanking Delicate Botanical Sprigs */}
        <div className="gift-subtitle-wrap">
          <span className="gift-sprig gift-sprig-left" aria-hidden="true">
            <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M58 20C42 16 28 8 2 2M14 6C16 11 20 13 25 11M27 10C29 15 34 17 39 15M41 14C43 19 48 21 53 19"
                stroke="#C8BBA9"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M12 4C11 1 8 0 5 1C3 4 5 7 8 7M25 8C24 5 21 4 18 5C16 8 18 11 21 11M38 12C37 9 34 8 31 9C29 12 31 15 34 15"
                stroke="#B89F82"
                strokeWidth="1.4"
                fill="rgba(216, 192, 165, 0.25)"
              />
            </svg>
          </span>

          <p className="gift-subtitle">Make your gift more personal and memorable.</p>

          <span className="gift-sprig gift-sprig-right" aria-hidden="true">
            <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 20C18 16 32 8 58 2M46 6C44 11 40 13 35 11M33 10C31 15 26 17 21 15M19 14C17 19 12 21 7 19"
                stroke="#C8BBA9"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M48 4C49 1 52 0 55 1C57 4 55 7 52 7M35 8C36 5 39 4 42 5C44 8 42 11 39 11M22 12C23 9 26 8 29 9C31 12 29 15 26 15"
                stroke="#B89F82"
                strokeWidth="1.4"
                fill="rgba(216, 192, 165, 0.25)"
              />
            </svg>
          </span>
        </div>

        {/* Supporting Editorial Description */}
        <p className="gift-lede">
          Add a premium gift wrapping to your commissioned artwork and surprise
          your loved ones with a handcrafted, artist-style presentation.
        </p>
      </div>

      {/* ============================================================
          THREE PACKAGE CARDS (HORIZONTAL ROW)
          ============================================================ */}
      <div className="gift-cards-grid" role="radiogroup" aria-label="Gift wrapping packages">
        {GIFT_PACKAGES.map((pkg) => {
          const isSelected = enabled && selectedPackageId === pkg.id;
          const isRecommended = pkg.isRecommended;

          return (
            <div
              key={pkg.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => handleCardClick(pkg.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(pkg.id);
                }
              }}
              className={`gift-card ${isSelected ? "is-selected" : ""} ${
                isRecommended ? "is-recommended" : ""
              }`}
              data-cursor="hover"
            >
              {/* Packaging Photograph */}
              <div className="gift-card-media">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="gift-card-img"
                  loading="lazy"
                />

                {/* Recommended Badge on Premium Wrap */}
                {isRecommended && (
                  <div className="gift-recommended-badge" aria-label="Recommended package">
                    <Star size={12} strokeWidth={2.5} fill="#FFFFFF" />
                    <span>Recommended</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="gift-card-body">
                {/* Header Row: Title & Price */}
                <div className="gift-card-header-row">
                  <h3 className="gift-card-name">{pkg.name}</h3>
                  <span className="gift-card-price-pill">{pkg.priceDisplay}</span>
                </div>

                {/* Features List with Checkmarks */}
                <ul className="gift-features-list">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="gift-feature-item">
                      <Check size={15} strokeWidth={2.4} className="gift-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================
          GIFT CUSTOMIZATION BOX & SUMMARY
          ============================================================ */}
      <div className="gift-custom-box">
        {/* Bottom-Left Stacked Gift Boxes Hand-Drawn Sketch Accent */}
        <div className="gift-stacked-decor" aria-hidden="true">
          <img
            src="/gallery/gift-boxes-stacked-sketch.png"
            alt=""
            className="gift-stacked-img"
          />
        </div>

        {/* Top Checkbox: I want this artwork gift-wrapped */}
        <div className="gift-checkbox-row">
          <label htmlFor={checkboxId} className="gift-checkbox-label" data-cursor="hover">
            <input
              id={checkboxId}
              type="checkbox"
              checked={enabled}
              onChange={(e) => {
                setEnabled(e.target.checked);
                setError("");
              }}
              className="gift-checkbox-native"
            />
            <span className={`gift-checkbox-visual ${enabled ? "is-checked" : ""}`} aria-hidden="true">
              {enabled && <Check size={14} strokeWidth={3} className="gift-checkbox-check" />}
            </span>
            <span className="gift-checkbox-text">I want this artwork gift-wrapped.</span>
          </label>
        </div>

        {/* Customization Fields & Summary Form (Shown when checked) */}
        {enabled && (
          <div className="gift-custom-body">
            <div className="gift-form-col">
              {/* Row 1: Package, Occasion, Recipient Name */}
              <div className="gift-form-row-3">
                {/* Field 01: Select Package */}
                <div className="gift-field-group">
                  <label htmlFor={packageSelectId} className="gift-field-label">
                    <span>Select Package</span>
                    <span className="gift-field-req">*</span>
                  </label>
                  <div className="gift-select-wrap">
                    <select
                      id={packageSelectId}
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="gift-select-input"
                    >
                      {GIFT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.priceDisplay})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 02: Occasion */}
                <div className="gift-field-group">
                  <label htmlFor={occasionSelectId} className="gift-field-label">
                    <span>Occasion</span>
                    <span className="gift-field-req">*</span>
                  </label>
                  <div className="gift-input-icon-wrap">
                    <Gift size={16} strokeWidth={1.8} className="gift-input-icon" />
                    <select
                      id={occasionSelectId}
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="gift-select-input with-icon"
                    >
                      {OCCASIONS.map((occ) => (
                        <option key={occ} value={occ}>
                          {occ}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 03: Recipient Name */}
                <div className="gift-field-group">
                  <label htmlFor={recipientInputId} className="gift-field-label">
                    <span>Recipient Name</span>
                    <span className="gift-field-req">*</span>
                  </label>
                  <div className="gift-input-icon-wrap">
                    <User size={16} strokeWidth={1.8} className="gift-input-icon" />
                    <input
                      id={recipientInputId}
                      type="text"
                      value={recipientName}
                      onChange={(e) => {
                        setRecipientName(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter recipient's name"
                      className={`gift-text-input with-icon ${error ? "has-error" : ""}`}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Personal Message (Optional) */}
              <div className="gift-field-group gift-message-group">
                <div className="gift-message-label-row">
                  <label htmlFor={messageInputId} className="gift-field-label">
                    <span>Personal Message (Optional)</span>
                  </label>
                </div>
                <div className="gift-textarea-wrap">
                  <textarea
                    id={messageInputId}
                    rows={2}
                    maxLength={150}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Write a special message for your loved one..."
                    className="gift-textarea-input"
                  />
                  <span className="gift-char-counter">
                    {personalMessage.length} / 150
                  </span>
                </div>
              </div>

              {/* Validation Error Message */}
              {error && (
                <div className="gift-error-msg" role="alert">
                  {error}
                </div>
              )}
            </div>

            {/* Right Summary Panel & Action */}
            <div className="gift-summary-panel">
              <div className="gift-summary-card">
                {/* Floating Orange Ribbon Bow Accent */}
                <div className="gift-summary-bow-wrap" aria-hidden="true">
                  <img
                    src="/gallery/gift-ribbon-bow-accent.png"
                    alt=""
                    className="gift-summary-bow-img"
                  />
                </div>

                {/* Summary Title */}
                <h4 className="gift-summary-heading">Gift Add-on</h4>

                {/* Selected Package Details */}
                <div className="gift-summary-line">
                  <span className="gift-summary-name">{selectedPackage.name}</span>
                  <span className="gift-summary-price">{selectedPackage.priceDisplay}</span>
                </div>

                {/* Continue with Commission Button */}
                <button
                  type="button"
                  className="gift-continue-btn"
                  onClick={handleContinue}
                  data-cursor="hover"
                >
                  <span className="gift-continue-text">Continue with Commission</span>
                  <span className="gift-continue-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
