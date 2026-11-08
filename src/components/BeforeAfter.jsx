import { useState } from "react";
import { ArrowRight, Check, Image, Layers, Pencil, Sparkles } from "lucide-react";
import beforeAfter from "../data/beforeAfter.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import "./beforeafter.css";

const PROCESS_STEPS = [
  {
    step: "01",
    icon: Image,
    title: "Reference Photo",
    desc: "The original photo shared by the client.",
  },
  {
    step: "02",
    icon: Pencil,
    title: "Sketch & Outline",
    desc: "Hand-drawn outline with proper proportions.",
  },
  {
    step: "03",
    icon: Layers,
    title: "Detailing & Shading",
    desc: "Building depth, texture and realistic details.",
  },
  {
    step: "04",
    icon: Check,
    title: "Final Portrait",
    desc: "A lifelike, handmade portrait ready to be framed.",
  },
];

export default function BeforeAfter() {
  const { t } = useLang();
  const headingRef = useReveal();
  const contentRef = useReveal({ threshold: 0.1 });
  const { openBooking } = useBooking();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const currentItem = beforeAfter[currentIndex] || beforeAfter[0];
  const isLandscape = currentItem?.aspect === "landscape";

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfter.length);
  };

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfter.length) % beforeAfter.length);
  };

  const minSwipeDistance = 45;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextTransformation(); // swiped left -> next
    } else if (distance < -minSwipeDistance) {
      prevTransformation(); // swiped right -> prev
    }
  };

  return (
    <section id="transformation" className="section before-after" aria-label="Transformation Studio">
      {/* Background Pencil Sketch and Torn Paper Decors */}
      <div className="ba-bg-decorations" aria-hidden="true">
        {/* Top-Right Pencil Eye Sketch — Exact from Reference Photo */}
        <div className="ba-bg-eye-wrap">
          <img
            src="/gallery/eye-sketch-exact.png"
            alt=""
            className="ba-bg-eye-img"
          />
        </div>

        {/* Lower-Left Realistic Artist Pencils Angled from Corner */}
        <div className="ba-bg-pencils-wrap">
          <svg
            viewBox="0 0 160 160"
            width="160"
            height="160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ba-pencils-svg"
          >
            {/* Pencil 1 (Dark Graphite) */}
            <g transform="rotate(-62 40 120)">
              <rect x="25" y="5" width="90" height="12" fill="#BA652B" rx="1" />
              <line x1="25" y1="9" x2="115" y2="9" stroke="#E29252" strokeWidth="1" />
              <polygon points="25,5 2,11 25,17" fill="#E8CFAD" />
              <polygon points="7,9.5 0,11 7,12.5" fill="#1C1A18" />
            </g>
            {/* Pencil 2 (Amber Studio) */}
            <g transform="rotate(-48 50 140)">
              <rect x="25" y="5" width="95" height="13" fill="#D98246" rx="1" />
              <line x1="25" y1="9" x2="120" y2="9" stroke="#F6AA6E" strokeWidth="1" />
              <polygon points="25,5 2,11.5 25,18" fill="#F5DFBF" />
              <polygon points="8,10 0,11.5 8,13" fill="#1C1A18" />
            </g>
          </svg>
        </div>

        {/* Lower-Right Burnt Orange Torn Paper Edge */}
        <div className="ba-bg-orange-tear" />
      </div>

      <div className="wrap ba-container">
        {/* Section Header */}
        <div ref={headingRef} className="reveal ba-header">
          <div className="ba-eyebrow-row">
            <span className="ba-plate-badge">Plate 01.5</span>
            <span className="ba-eyebrow">— THE TRANSFORMATION</span>
          </div>

          <h2 className="ba-title">
            From Photo to Portrait
            <svg
              className="ba-title-underline"
              viewBox="0 0 240 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 11C40 4 110 3 236 9C175 15 80 16 16 13"
                stroke="#C94A29"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>

          <p className="ba-lede">
            See the transformation from a simple reference photo to a hand-drawn
            portrait, crafted with detail and realism.
          </p>
        </div>

        {/* Two-Column Studio Layout */}
        <div ref={contentRef} className="reveal ba-studio-grid">
          {/* Left Column: Direct Dual Reference & Sketch Showcase (~60% width) */}
          <div className="ba-comparison-col">
            <div
              className="ba-paper-stack"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Back Layer: Burnt Orange Craft Sheet */}
              <div className="ba-layer-orange" aria-hidden="true" />

              {/* Main Layer: Handmade Torn Paper Mount */}
              <div className="ba-layer-mount">
                {/* Direct Dual Display: Reference Photo & Sketch Side-by-Side */}
                <div className={`ba-direct-display ${isLandscape ? "ba-landscape-display" : ""}`}>
                  {/* Left: Original Reference Photo */}
                  <div className="ba-photo-card ba-card-ref">
                    <div className={`ba-img-wrapper ${isLandscape ? "ba-img-landscape" : ""}`}>
                      <img
                        src={currentItem.before}
                        alt={`${currentItem.title} — client reference photo`}
                        className="ba-artwork-img ba-img-ref"
                        loading="eager"
                      />
                    </div>
                    <div className="ba-card-badge ba-badge-ref">
                      <span className="ba-badge-dot" />
                      REFERENCE
                    </div>
                  </div>

                  {/* Center Transformation Indicator Button */}
                  <button
                    type="button"
                    className="ba-trans-indicator"
                    onClick={nextTransformation}
                    data-cursor="hover"
                    aria-label="Next transformation"
                    title="Next transformation"
                  >
                    <div className="ba-indicator-circle">
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </div>
                  </button>

                  {/* Right: Finished Handmade Sketch */}
                  <div className="ba-photo-card ba-card-sketch">
                    <div className={`ba-img-wrapper ${isLandscape ? "ba-img-landscape" : ""}`}>
                      <img
                        src={currentItem.after}
                        alt={`${currentItem.title} — hand-drawn portrait`}
                        className="ba-artwork-img ba-img-sketch"
                        loading="eager"
                      />
                    </div>
                    <div className="ba-card-badge ba-badge-sketch">
                      <Sparkles size={11} strokeWidth={2.5} className="ba-badge-icon" />
                      SKETCH
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Handwritten Craft Paper Tag Below Artwork */}
            <div className="ba-caption-tag-row">
              <div className="ba-paper-tag">
                <span className="ba-tag-text">{currentItem.title}</span>
                {currentItem.medium && (
                  <span className="ba-tag-medium"> — {currentItem.medium}</span>
                )}
              </div>
              <svg
                className="ba-tag-arrow-doodle"
                viewBox="0 0 44 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 26C16 25 32 18 36 6M36 6L28 10M36 6L38 15"
                  stroke="#211B15"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Creative Process Timeline (~40% width) */}
          <div className="ba-process-col">
            <div className="ba-process-header">
              <h3 className="ba-process-title">
                The Process
                <svg
                  className="ba-process-stroke"
                  viewBox="0 0 160 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 8C30 3 85 2 156 7"
                    stroke="#C94A29"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </h3>
            </div>

            {/* Vertical Timeline Steps */}
            <div className="ba-timeline-container">
              {/* Connecting Orange Guide Line */}
              <div className="ba-timeline-spine" aria-hidden="true" />

              <div className="ba-timeline-steps">
                {PROCESS_STEPS.map((step, idx) => {
                  const IconComponent = step.icon;
                  return (
                    <div className="ba-step-row" key={step.step}>
                      {/* Timeline Node Point on Line */}
                      <div className="ba-step-node" aria-hidden="true">
                        <span className="ba-node-dot" />
                      </div>

                      {/* Icon Badge */}
                      <div className="ba-step-icon-badge" aria-hidden="true">
                        <IconComponent size={18} strokeWidth={1.8} className="ba-step-icon" />
                      </div>

                      {/* Text Content */}
                      <div className="ba-step-body">
                        <div className="ba-step-header">
                          <span className="ba-step-number">{step.step}</span>
                          <h4 className="ba-step-title">{step.title}</h4>
                        </div>
                        <p className="ba-step-desc">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Button: View More Transformations */}
            {beforeAfter.length > 1 && (
              <div
                className="ba-action-area"
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") nextTransformation();
                  if (e.key === "ArrowLeft") prevTransformation();
                }}
              >
                <button
                  type="button"
                  className="ba-view-more-btn"
                  onClick={nextTransformation}
                  data-cursor="hover"
                  aria-label="View more transformations"
                >
                  <span>View More Transformations</span>
                  <ArrowRight size={17} strokeWidth={2} className="ba-btn-arrow" />
                </button>

                <div className="ba-dots-row" role="tablist" aria-label="Transformation items">
                  {beforeAfter.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === currentIndex}
                      className={`ba-dot-pill ${idx === currentIndex ? "active" : ""}`}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`View transformation ${idx + 1}: ${item.title}`}
                      title={item.title}
                    />
                  ))}
                  <span className="ba-count-badge">
                    {currentIndex + 1} / {beforeAfter.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="ba-commission-btn"
                  onClick={() =>
                    openBooking({
                      sourceTitle: currentItem.title,
                      sourceType: "From Photo to Portrait",
                      artworkType: "Portrait",
                      subject: currentItem.title,
                      medium: currentItem.medium,
                      artworkImage: currentItem.after,
                      source: `Transformation — ${currentItem.title}`,
                    })
                  }
                  data-cursor="hover"
                >
                  <Sparkles size={14} />
                  <span>Request Similar Portrait</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
