import React, { useState, useMemo } from "react";
import {
  Calculator,
  Check,
  Clock,
  ExternalLink,
  Gift,
  HelpCircle,
  Image as ImageIcon,
  MessageCircle,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import site from "../data/site.js";
import { useBooking } from "../context/BookingContext.jsx";
import { getSanitizedWhatsAppNumber } from "../utils/bookingSubmission.js";
import "./priceEstimator.css";

const MEDIUMS = [
  {
    id: "graphite",
    name: "Graphite Pencil",
    desc: "Monochrome realism & delicate pencil hatching",
    turnaroundDays: "4 – 6 Days",
    prices: { A5: 799, A4: 1499, A3: 2499, A2: 3999 },
    extraFacePrice: 500,
  },
  {
    id: "charcoal",
    name: "Charcoal Study",
    desc: "Deep velvety blacks & dramatic chiaroscuro contrast",
    turnaroundDays: "4 – 6 Days",
    prices: { A5: 899, A4: 1699, A3: 2799, A2: 4499 },
    extraFacePrice: 500,
  },
  {
    id: "colour",
    name: "Colour Pencil",
    desc: "Warm lifelike skin tones & rich layered textures",
    turnaroundDays: "6 – 8 Days",
    popular: true,
    prices: { A5: 1299, A4: 2499, A3: 3999, A2: 5999 },
    extraFacePrice: 800,
  },
  {
    id: "acrylic",
    name: "Acrylic / Painting",
    desc: "Vibrant archival paint on premium textured canvas",
    turnaroundDays: "7 – 10 Days",
    prices: { A5: 1699, A4: 2999, A3: 4799, A2: 7499 },
    extraFacePrice: 1000,
  },
];

const SIZES = [
  { id: "A5", label: "A5", dims: "14.8 × 21 cm", desc: "Desk & bedside display", framePrice: 599 },
  { id: "A4", label: "A4", dims: "21 × 29.7 cm", desc: "Most popular choice", tag: "BESTSELLER", framePrice: 799 },
  { id: "A3", label: "A3", dims: "29.7 × 42 cm", desc: "Statement wall portrait", framePrice: 1199 },
  { id: "A2", label: "A2", dims: "42 × 59.4 cm", desc: "Grand gallery statement", framePrice: 1799 },
];

const SUBJECT_OPTIONS = [
  { id: 1, label: "1 Person / Pet", multiplierCount: 0 },
  { id: 2, label: "2 (Couples)", multiplierCount: 1 },
  { id: 3, label: "3 Persons", multiplierCount: 2 },
  { id: 4, label: "4+ (Group / Family)", multiplierCount: 3 },
];

export default function PriceEstimator({ onOpenPhotoGuide }) {
  const { openBooking } = useBooking();
  const [selectedMedium, setSelectedMedium] = useState("colour");
  const [selectedSize, setSelectedSize] = useState("A4");
  const [selectedSubjects, setSelectedSubjects] = useState(1);
  const [isFramed, setIsFramed] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  const mediumObj = MEDIUMS.find((m) => m.id === selectedMedium) || MEDIUMS[0];
  const sizeObj = SIZES.find((s) => s.id === selectedSize) || SIZES[1];
  const subjectObj = SUBJECT_OPTIONS.find((s) => s.id === selectedSubjects) || SUBJECT_OPTIONS[0];

  const { basePrice, extraFacesCost, frameCost, expressCost, giftCost, totalPrice, turnaroundText } =
    useMemo(() => {
      const base = mediumObj.prices[sizeObj.id] || 1499;
      const extraFaces = subjectObj.multiplierCount * mediumObj.extraFacePrice;
      const frame = isFramed ? sizeObj.framePrice : 0;
      const subtotalBeforeAddons = base + extraFaces + frame;
      const express = isExpress ? Math.round(subtotalBeforeAddons * 0.25) : 0;
      const gift = isGiftWrap ? 249 : 0;
      const total = subtotalBeforeAddons + express + gift;

      let turnaround = mediumObj.turnaroundDays;
      if (isExpress) {
        turnaround = "48 – 72 Hours (Rush Dispatch)";
      }

      return {
        basePrice: base,
        extraFacesCost: extraFaces,
        frameCost: frame,
        expressCost: express,
        giftCost: gift,
        totalPrice: total,
        turnaroundText: turnaround,
      };
    }, [mediumObj, sizeObj, subjectObj, isFramed, isExpress, isGiftWrap]);

  const cleanWhatsAppNumber = getSanitizedWhatsAppNumber(site.whatsappNumber);

  const buildWhatsAppUrl = () => {
    const text = [
      `Hi Deepak! 👋 I customized a commission estimate on your website and would love to proceed:`,
      ``,
      `🎨 Medium: ${mediumObj.name}`,
      `📐 Size: ${sizeObj.label} (${sizeObj.dims})`,
      `👥 Subjects: ${subjectObj.label}`,
      `🖼️ Presentation: ${isFramed ? `Ready-to-Hang Frame (+₹${frameCost})` : "Safe Unframed Tube"}`,
      isExpress ? `⚡ Speed: Express Rush (48–72h priority)` : null,
      isGiftWrap ? `🎁 Gift Packaging: Real wax-seal + handwritten card` : null,
      `💰 Estimated Total: ₹${totalPrice.toLocaleString("en-IN")}`,
      `⏱️ Estimated Turnaround: ${turnaroundText}`,
      ``,
      `Can we discuss reference photos and slot availability?`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    return `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleBookWithSpecs = () => {
    openBooking({
      medium: mediumObj.name,
      size: sizeObj.label,
      subjectCount: selectedSubjects,
      artworkType: selectedMedium === "acrylic" ? "Custom Painting" : "Portrait",
      budget: `₹${totalPrice.toLocaleString("en-IN")}`,
      giftWrapping: isGiftWrap,
      source: `Price Estimator (₹${totalPrice})`,
    });
  };

  return (
    <div className="estimator-container" id="price-calculator">
      {/* Top Banner Tag */}
      <div className="estimator-badge-row">
        <span className="estimator-badge">
          <Calculator size={13} className="estimator-badge-icon" />
          <span>LIVE ESTIMATOR</span>
        </span>
        <span className="estimator-badge-note">
          Instant calculation • No hidden fees • 50% advance to start
        </span>
      </div>

      <div className="estimator-main-grid">
        {/* ============================================================
            LEFT COLUMN: INTERACTIVE CONTROLS
            ============================================================ */}
        <div className="estimator-controls-col">
          {/* Step 1: Medium */}
          <div className="estimator-group">
            <div className="estimator-group-label-row">
              <span className="estimator-step-num">1</span>
              <label className="estimator-group-title">Choose Artwork Medium</label>
            </div>
            <div className="estimator-medium-grid">
              {MEDIUMS.map((m) => {
                const isSelected = m.id === selectedMedium;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMedium(m.id)}
                    className={`estimator-medium-card ${isSelected ? "is-selected" : ""}`}
                    data-cursor="hover"
                  >
                    {m.popular && <span className="estimator-pill-popular">POPULAR</span>}
                    <div className="estimator-card-radio" aria-hidden="true">
                      {isSelected && <span className="estimator-radio-dot" />}
                    </div>
                    <div className="estimator-medium-info">
                      <div className="estimator-medium-name">{m.name}</div>
                      <div className="estimator-medium-desc">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Size */}
          <div className="estimator-group">
            <div className="estimator-group-label-row">
              <span className="estimator-step-num">2</span>
              <label className="estimator-group-title">Select Artwork Size</label>
            </div>
            <div className="estimator-size-grid">
              {SIZES.map((s) => {
                const isSelected = s.id === selectedSize;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSize(s.id)}
                    className={`estimator-size-card ${isSelected ? "is-selected" : ""}`}
                    data-cursor="hover"
                  >
                    {s.tag && <span className="estimator-pill-tag">{s.tag}</span>}
                    <span className="estimator-size-label">{s.label}</span>
                    <span className="estimator-size-dims">{s.dims}</span>
                    <span className="estimator-size-desc">{s.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Subjects / Number of Faces */}
          <div className="estimator-group">
            <div className="estimator-group-label-row">
              <span className="estimator-step-num">3</span>
              <label className="estimator-group-title">Number of Subjects (Faces)</label>
            </div>
            <div className="estimator-subject-grid">
              {SUBJECT_OPTIONS.map((sub) => {
                const isSelected = sub.id === selectedSubjects;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubjects(sub.id)}
                    className={`estimator-subject-pill ${isSelected ? "is-selected" : ""}`}
                    data-cursor="hover"
                  >
                    <span>{sub.label}</span>
                    {sub.multiplierCount > 0 && (
                      <span className="estimator-extra-badge">
                        +₹{sub.multiplierCount * mediumObj.extraFacePrice}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Framing & Presentation */}
          <div className="estimator-group">
            <div className="estimator-group-label-row">
              <span className="estimator-step-num">4</span>
              <label className="estimator-group-title">Framing &amp; Presentation</label>
            </div>
            <div className="estimator-framing-row">
              <button
                type="button"
                onClick={() => setIsFramed(false)}
                className={`estimator-frame-opt ${!isFramed ? "is-selected" : ""}`}
                data-cursor="hover"
              >
                <div className="estimator-frame-radio" aria-hidden="true">
                  {!isFramed && <span className="estimator-radio-dot" />}
                </div>
                <div className="estimator-frame-text">
                  <strong>Unframed in Hard PVC Tube</strong>
                  <span>Safely rolled with acid-free glassine sheet (Included)</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsFramed(true)}
                className={`estimator-frame-opt ${isFramed ? "is-selected" : ""}`}
                data-cursor="hover"
              >
                <div className="estimator-frame-radio" aria-hidden="true">
                  {isFramed && <span className="estimator-radio-dot" />}
                </div>
                <div className="estimator-frame-text">
                  <strong>Ready-to-Hang Frame (+₹{sizeObj.framePrice})</strong>
                  <span>Sleek dark wood finish with acrylic/glass front</span>
                </div>
              </button>
            </div>
          </div>

          {/* Step 5: Optional Add-ons */}
          <div className="estimator-group">
            <label className="estimator-group-title">Optional Finishing Touches</label>
            <div className="estimator-addons-grid">
              <button
                type="button"
                onClick={() => setIsExpress((v) => !v)}
                className={`estimator-addon-card ${isExpress ? "is-active" : ""}`}
                data-cursor="hover"
              >
                <div className="estimator-addon-check" aria-hidden="true">
                  {isExpress && <Check size={13} strokeWidth={3} />}
                </div>
                <Zap size={16} className="estimator-addon-icon" />
                <div className="estimator-addon-info">
                  <span className="estimator-addon-name">Rush Delivery (48–72h)</span>
                  <span className="estimator-addon-price">+25% (+₹{expressCost || Math.round((basePrice + extraFacesCost + frameCost) * 0.25)})</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsGiftWrap((v) => !v)}
                className={`estimator-addon-card ${isGiftWrap ? "is-active" : ""}`}
                data-cursor="hover"
              >
                <div className="estimator-addon-check" aria-hidden="true">
                  {isGiftWrap && <Check size={13} strokeWidth={3} />}
                </div>
                <Gift size={16} className="estimator-addon-icon" />
                <div className="estimator-addon-info">
                  <span className="estimator-addon-name">Wax-Sealed Gift Wrap</span>
                  <span className="estimator-addon-price">+₹249</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: LIVE SUMMARY & ACTION BOARD
            ============================================================ */}
        <div className="estimator-summary-col">
          <div className="estimator-summary-ticket">
            {/* Ticket Header with Vintage Stamp */}
            <div className="estimator-ticket-header">
              <div>
                <span className="estimator-ticket-eyebrow">COMMISSION SPECIFICATION</span>
                <h3 className="estimator-ticket-title">Live Estimate Summary</h3>
              </div>
              <div className="estimator-ticket-stamp" aria-hidden="true">
                DK ARTS
              </div>
            </div>

            {/* Price Big Display */}
            <div className="estimator-price-hero">
              <div className="estimator-price-label">ESTIMATED TOTAL</div>
              <div className="estimator-price-value">
                <span className="estimator-currency">₹</span>
                <span className="estimator-amount">{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="estimator-price-note">
                Includes 300+ GSM archival paper &amp; transit protection
              </div>
            </div>

            {/* Itemized Specification Breakdown */}
            <div className="estimator-breakdown-list">
              <div className="estimator-breakdown-row">
                <span className="estimator-item-name">{mediumObj.name} ({sizeObj.label})</span>
                <span className="estimator-item-val">₹{basePrice.toLocaleString("en-IN")}</span>
              </div>

              {extraFacesCost > 0 && (
                <div className="estimator-breakdown-row">
                  <span className="estimator-item-name">Extra Subjects ({selectedSubjects - 1} additional)</span>
                  <span className="estimator-item-val">+₹{extraFacesCost.toLocaleString("en-IN")}</span>
                </div>
              )}

              {isFramed && (
                <div className="estimator-breakdown-row">
                  <span className="estimator-item-name">Framing ({sizeObj.label} ready-to-hang)</span>
                  <span className="estimator-item-val">+₹{frameCost.toLocaleString("en-IN")}</span>
                </div>
              )}

              {isExpress && (
                <div className="estimator-breakdown-row is-highlight">
                  <span className="estimator-item-name">Express Priority Dispatch</span>
                  <span className="estimator-item-val">+₹{expressCost.toLocaleString("en-IN")}</span>
                </div>
              )}

              {isGiftWrap && (
                <div className="estimator-breakdown-row is-highlight">
                  <span className="estimator-item-name">Wax-Seal Gift Presentation</span>
                  <span className="estimator-item-val">+₹{giftCost.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>

            {/* Estimated Turnaround Time Pill */}
            <div className="estimator-turnaround-strip">
              <Clock size={15} className="estimator-clock-icon" />
              <span>
                Turnaround: <strong>{turnaroundText}</strong>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="estimator-actions-box">
              {/* WhatsApp Fast Enquiry */}
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="estimator-btn estimator-btn-wa"
                data-cursor="hover"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp with Specs</span>
              </a>

              {/* Form Booking */}
              <button
                type="button"
                onClick={handleBookWithSpecs}
                className="estimator-btn estimator-btn-form"
                data-cursor="hover"
              >
                <Sparkles size={16} />
                <span>Book This Custom Artwork</span>
              </button>
            </div>

            {/* Photo Quality Notice & Helper */}
            {onOpenPhotoGuide && (
              <button
                type="button"
                onClick={onOpenPhotoGuide}
                className="estimator-photo-guide-trigger"
                data-cursor="hover"
              >
                <HelpCircle size={14} />
                <span>Unsure about your photo? View Photo Quality Guide</span>
              </button>
            )}

            {/* Satisfaction Guarantee Footnote */}
            <div className="estimator-guarantee">
              <Check size={14} className="estimator-guarantee-check" />
              <span>Full sketch approval before final delivery • All India shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
