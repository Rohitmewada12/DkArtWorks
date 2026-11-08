import React from "react";
import { Clock, Instagram } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./process.css";

export default function Process() {
  const { t } = useLang();
  const headingRef = useReveal();
  const stepsRef = useReveal({ threshold: 0.1 });
  const cardsRef = useReveal({ threshold: 0.1 });
  const ctaRef = useReveal({ threshold: 0.1 });

  return (
    <section id="process" className="section process-studio" aria-label="DK Arts — The Commission Studio">
      {/* ============================================================
          WARM HANDMADE DRAWING-PAPER TEXTURE & ARTISTIC DECORATIONS
          ============================================================ */}
      <div className="process-bg-decorations" aria-hidden="true">
        {/* Subtle Paper Fiber Layer */}
        <div className="process-texture-fibers" />

        {/* Fine Paper Grain Noise */}
        <div className="process-texture-noise" />

        {/* Soft Warm Vignette */}
        <div className="process-texture-vignette" />

        {/* Upper-Left Burnt-Orange Dry-Brush Stroke */}
        <div className="process-brush-topleft">
          <svg
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="process-brush-svg"
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
            <path
              d="M-10 72C20 85 65 110 135 152C90 152 45 135 0 102"
              fill="#E65312"
              opacity="0.45"
            />
          </svg>
        </div>

        {/* Upper-Right Pencil Sketch Illustration with Graphite Shavings */}
        <div className="process-pencil-decor">
          <img
            src="/gallery/commission-pencil-illustration.png"
            alt=""
            className="process-pencil-img"
          />
        </div>

        {/* Lower-Right Burnt-Orange Dry-Brush Stroke */}
        <div className="process-brush-bottomright">
          <svg
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="process-brush-svg"
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
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      <div className="wrap process-inner">
        {/* ============================================================
            SECTION INTRODUCTION
            ============================================================ */}
        <div ref={headingRef} className="reveal process-header">
          {/* Small Orange Handwritten Label + Spaced Monospace */}
          <div className="process-plate-row">
            <span className="process-plate-num">{t("process.chapter")}</span>
            <span className="process-plate-dash">—</span>
            <span className="process-plate-label">{t("process.eyebrow")}</span>
          </div>

          {/* Editorial Serif Heading with Hand-Painted Orange Underline */}
          <div className="process-title-box">
            <h2 className="process-title">{t("process.heading")}</h2>
            <svg
              className="process-title-underline"
              viewBox="0 0 380 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 11C80 4 220 3 376 9C265 15 130 16 20 13"
                stroke="#E65312"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Editorial Description */}
          <p className="process-lede">{t("process.lede")}</p>
        </div>

        {/* ============================================================
            FOUR ILLUSTRATED PROCESS STEPS (CONNECTED TIMELINE)
            ============================================================ */}
        <div ref={stepsRef} className="reveal process-timeline-section">
          <div className="process-timeline-wrap">
            {/* Horizontal Timeline Connector Line */}
            <div className="process-timeline-line" aria-hidden="true" />

            <div className="process-steps-grid">
              {site.process.map((step, idx) => (
                <div key={step.num} className="process-step-item">
                  <div className="process-step-card-wrap">
                    <div className="process-step-card">
                      <div className="process-step-info">
                        <span className="process-step-num">{step.num}</span>
                        <h3 className="process-step-title">{step.title}</h3>
                        <p className="process-step-desc">{step.body}</p>
                      </div>
                      <div className="process-step-illus-box">
                        <img
                          src={step.illustration}
                          alt={step.alt}
                          className="process-step-illus-img"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Circular Orange Timeline Marker (Between steps on desktop) */}
                  {idx < site.process.length - 1 && (
                    <span className="process-timeline-node" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            THREE LARGE ARTWORK SERVICE CARDS
            ============================================================ */}
        <div ref={cardsRef} className="reveal commission-services-section">
          <div className="commission-services-grid">
            {site.commissionTypes.map((c) => (
              <div
                key={c.title}
                className={`commission-service-card-wrap ${
                  c.hasCornerAccent ? "has-corner-accent" : ""
                }`}
              >
                {/* Dry-brush corner decoration for Card 1 & Card 3 */}
                {c.hasCornerAccent && (
                  <div className="commission-service-corner-brush" aria-hidden="true">
                    <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M-10 10C15 20 45 32 95 45C60 52 25 40 -12 25"
                        fill="#E65312"
                        opacity="0.92"
                      />
                      <path
                        d="M-5 25C20 35 50 48 85 62C55 64 20 52 -8 38"
                        fill="#E65312"
                        opacity="0.75"
                      />
                    </svg>
                  </div>
                )}

                <div className="commission-service-card">
                  {/* Left Column: Artwork Image with Deckled Edge Mount */}
                  <div className="commission-service-art">
                    <div className="commission-service-art-mount">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="commission-service-img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right Column: Details & Action */}
                  <div className="commission-service-body">
                    <h3 className="commission-service-title">{c.title}</h3>
                    <span className="commission-service-medium">{c.medium}</span>

                    <div className="commission-service-turnaround">
                      <Clock size={16} strokeWidth={2} className="commission-turnaround-icon" />
                      <div className="commission-turnaround-text">
                        <span className="commission-turnaround-label">
                          {t("process.turnaround")}
                        </span>
                        <strong className="commission-turnaround-val">{c.turnaround}</strong>
                      </div>
                    </div>

                    <a
                      href={
                        site.whatsappNumber
                          ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
                              `Hi Deepak! I'd like to request a ${c.title} commission.`
                            )}`
                          : "#contact"
                      }
                      target={site.whatsappNumber ? "_blank" : undefined}
                      rel={site.whatsappNumber ? "noreferrer" : undefined}
                      className="commission-request-btn"
                      data-cursor="hover"
                    >
                      {t("process.requestBtn")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            PANORAMIC CALL-TO-ACTION BANNER
            ============================================================ */}
        <div ref={ctaRef} className="reveal process-cta-banner-section">
          <div className="process-cta-banner-wrap">
            <div className="process-cta-banner">
              {/* Left Column: Realistic Eye Drawing with Orange Dry-Brush Flare */}
              <div className="process-cta-banner-left">
                <img
                  src="/gallery/commission-cta-eye.png"
                  alt=""
                  className="process-cta-eye-img"
                  loading="lazy"
                />
              </div>

              {/* Center Divider Line */}
              <div className="process-cta-banner-divider" aria-hidden="true" />

              {/* Right Column: Heading, Description & Actions */}
              <div className="process-cta-banner-right">
                <div className="process-cta-banner-title-box">
                  <h3 className="process-cta-banner-title">{t("process.memoryHeading")}</h3>
                  <svg
                    className="process-cta-title-underline"
                    viewBox="0 0 280 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8C45 3 130 2 275 6C190 11 95 11 12 9"
                      stroke="#E65312"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <p className="process-cta-banner-lede">{t("process.memoryLede")}</p>

                <div className="process-cta-banner-actions">
                  <a href="#contact" className="process-cta-primary-btn" data-cursor="hover">
                    {t("process.startCommission")}
                  </a>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="process-cta-secondary-btn"
                    data-cursor="hover"
                  >
                    <Instagram size={17} strokeWidth={2} />
                    <span>{t("process.messageIg")}</span>
                  </a>
                </div>
              </div>

              {/* Far Right Corner Burnt-Orange Dry-Brush Accent */}
              <div className="process-cta-banner-corner" aria-hidden="true">
                <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M130 110C95 85 55 50 10 20C45 15 85 45 125 90"
                    fill="#E65312"
                    opacity="0.95"
                  />
                  <path
                    d="M135 85C95 60 50 30 5 0C45 5 90 35 130 70"
                    fill="#E65312"
                    opacity="0.8"
                  />
                  <path
                    d="M125 55C90 40 55 15 15 -10C45 -5 85 20 120 45"
                    fill="#E65312"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
