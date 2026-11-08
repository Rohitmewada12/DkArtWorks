import React, { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import testimonials from "../data/testimonials.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./testimonials.css";

export default function Testimonials() {
  const { t } = useLang();
  const headingRef = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  if (!testimonials || !testimonials.length) return null;

  // Track active slide on scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".testimonial-card-wrap");
    if (!card) return;
    const cardWidth = card.offsetWidth + 24; // width + gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(testimonials.length - 1, index)));
  };

  const scrollToIndex = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".testimonial-card-wrap");
    if (!card) return;
    const cardWidth = card.offsetWidth + 24;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setActiveIndex(idx);
  };

  const scrollPrev = () => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  };

  const scrollNext = () => {
    scrollToIndex(Math.min(testimonials.length - 1, activeIndex + 1));
  };

  return (
    <section id="testimonials" className="section reviews-section" aria-label="DK Arts — Client Stories & Reviews">
      {/* ============================================================
          WARM HANDMADE DRAWING-PAPER TEXTURE & ARTISTIC DECORATIONS
          ============================================================ */}
      <div className="reviews-bg-decorations" aria-hidden="true">
        {/* Fine Paper Grain Noise */}
        <div className="reviews-texture-noise" />

        {/* Soft Warm Paper Vignette */}
        <div className="reviews-texture-vignette" />

        {/* Upper-Left Burnt-Orange Dry-Brush Stroke */}
        <div className="reviews-brush-topleft">
          <svg
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="reviews-brush-svg"
            preserveAspectRatio="none"
          >
            <path
              d="M-20 -10C25 15 90 45 190 75C140 82 70 60 -10 32"
              fill="#E65312"
              opacity="0.95"
            />
            <path
              d="M-30 18C45 42 120 72 230 115C170 120 85 95 -15 50"
              fill="#E65312"
              opacity="0.88"
            />
            <path
              d="M-20 45C30 65 95 98 175 142C125 145 60 120 -10 75"
              fill="#E65312"
              opacity="0.65"
            />
          </svg>
        </div>

        {/* Upper-Right Faint Graphite Portrait Illustration */}
        <div className="reviews-pencil-decor">
          <img
            src="/gallery/reviews-pencil-portrait.png"
            alt=""
            className="reviews-pencil-img"
          />
        </div>

        {/* Lower-Right Burnt-Orange Dry-Brush Accent */}
        <div className="reviews-brush-bottomright">
          <svg
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="reviews-brush-svg"
            preserveAspectRatio="none"
          >
            <path
              d="M340 210C270 180 170 130 50 80C110 75 210 115 330 170"
              fill="#E65312"
              opacity="0.95"
            />
            <path
              d="M350 175C260 140 140 90 10 35C80 30 190 75 320 135"
              fill="#E65312"
              opacity="0.88"
            />
            <path
              d="M330 140C240 105 130 60 20 5C90 10 190 45 300 105"
              fill="#E65312"
              opacity="0.55"
            />
          </svg>
        </div>
      </div>

      <div className="wrap reviews-inner">
        {/* ============================================================
            SECTION INTRODUCTION
            ============================================================ */}
        <div ref={headingRef} className="reveal reviews-header">
          {/* Small Orange Handwritten Label + Spaced Monospace */}
          <div className="reviews-plate-row">
            <span className="reviews-plate-num">{t("testimonials.chapter")}</span>
            <span className="reviews-plate-dash">—</span>
            <span className="reviews-plate-label">{t("testimonials.eyebrow")}</span>
          </div>

          {/* Editorial Serif Heading with Hand-Painted Orange Underline */}
          <div className="reviews-title-box">
            <h2 className="reviews-title">{t("testimonials.heading")}</h2>
            <svg
              className="reviews-title-underline"
              viewBox="0 0 320 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 10C60 4 170 3 312 8C225 14 110 14 16 12"
                stroke="#E65312"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Editorial Description */}
          <p className="reviews-lede">{t("testimonials.lede")}</p>
        </div>

        {/* ============================================================
            THREE TORN-PAPER TESTIMONIAL CARDS (DESKTOP / CAROUSEL)
            ============================================================ */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="reviews-cards-track"
        >
          {testimonials.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`testimonial-card-wrap ${
                item.isFeatured ? "testimonial-card-featured" : ""
              }`}
            >
              {/* Featured Badge for Center Customer */}
              {item.isFeatured && (
                <div className="testimonial-card-badge">
                  <span>{item.badgeLabel || "★ VERIFIED COMMISSION"}</span>
                </div>
              )}

              <div className="testimonial-card">
                {/* Large Orange Opening Quotation Marks */}
                <div className="testimonial-quote-box">
                  <span className="testimonial-quote-mark" aria-hidden="true">
                    “
                  </span>
                </div>

                {/* Italic Serif Review Text */}
                <blockquote className="testimonial-review-text">
                  "{item.reviewText || item.quote}"
                </blockquote>

                {/* Five Orange Star Icons */}
                <div
                  className="testimonial-stars-row"
                  aria-label={`${item.rating || 5} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      fill="#E65312"
                      strokeWidth={0}
                      className="testimonial-star-icon"
                    />
                  ))}
                </div>

                {/* Thin Horizontal Divider Hairline */}
                <div className="testimonial-divider" aria-hidden="true" />

                {/* Bottom Client Information Row */}
                <div className="testimonial-client-row">
                  {/* Circular Avatar with Burnt-Orange Border */}
                  <div className="testimonial-avatar-box">
                    <img
                      src={item.clientPhoto}
                      alt={item.clientName || item.name}
                      className="testimonial-avatar-img"
                    />
                  </div>

                  {/* Vertical Divider Hairline */}
                  <div className="testimonial-client-divider" aria-hidden="true" />

                  {/* Name and Commission Details */}
                  <div className="testimonial-client-info">
                    <span className="testimonial-client-name">
                      {item.clientName || item.name}
                    </span>
                    <span className="testimonial-client-commission">
                      {item.commissionType || item.detail}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================
            CAROUSEL CONTROLS & PAGINATION
            ============================================================ */}
        <div className="reviews-controls" aria-label="Reviews carousel navigation">
          <button
            type="button"
            className="reviews-nav-btn reviews-nav-prev"
            onClick={scrollPrev}
            aria-label="Previous review"
            data-cursor="hover"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          <div className="reviews-dots-box">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`reviews-dot ${activeIndex === i ? "is-active" : ""}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                data-cursor="hover"
              />
            ))}
          </div>

          <button
            type="button"
            className="reviews-nav-btn reviews-nav-next"
            onClick={scrollNext}
            aria-label="Next review"
            data-cursor="hover"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
