import React from "react";
import {
  Crown,
  Users,
  Zap,
  Image as ImageIcon,
  Download,
  Palette,
  Layers,
  Gift,
  Instagram,
} from "lucide-react";
import { pricingTiers, addOns, alsoAvailable } from "../data/pricing.js";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./pricing.css";

export default function Pricing() {
  const { t } = useLang();
  const headingRef = useReveal();
  const tiersRef = useReveal({ threshold: 0.1 });
  const extraRef = useReveal({ threshold: 0.1 });
  const ctaRef = useReveal({ threshold: 0.1 });

  const renderAddonIcon = (iconName) => {
    switch (iconName) {
      case "users":
        return <Users size={17} strokeWidth={1.8} />;
      case "zap":
        return <Zap size={17} strokeWidth={1.8} />;
      case "image":
        return <ImageIcon size={17} strokeWidth={1.8} />;
      case "download":
        return <Download size={17} strokeWidth={1.8} />;
      default:
        return null;
    }
  };

  const renderAlsoIcon = (iconName) => {
    switch (iconName) {
      case "palette":
        return <Palette size={22} strokeWidth={1.75} />;
      case "layers":
        return <Layers size={22} strokeWidth={1.75} />;
      case "gift":
        return <Gift size={22} strokeWidth={1.75} />;
      default:
        return null;
    }
  };

  return (
    <section id="pricing" className="section pricing-catalogue" aria-label="DK Arts — Premium Pricing Catalogue">
      {/* ============================================================
          WARM HANDMADE DRAWING-PAPER TEXTURE & ARTISTIC DECORATIONS
          ============================================================ */}
      <div className="pricing-bg-decorations" aria-hidden="true">
        {/* Subtle Paper Fiber Layer */}
        <div className="pricing-texture-fibers" />

        {/* Fine Paper Grain Noise */}
        <div className="pricing-texture-noise" />

        {/* Soft Warm Vignette */}
        <div className="pricing-texture-vignette" />

        {/* Upper-Left Burnt-Orange Dry-Brush Stroke */}
        <div className="pricing-brush-topleft">
          <svg
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pricing-brush-svg"
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

        {/* Upper-Right Delicate Pencil Sketch Illustration */}
        <div className="pricing-pencil-decor">
          <img
            src="/gallery/pricing-pencil-portrait.png"
            alt=""
            className="pricing-pencil-img"
          />
        </div>

        {/* Lower-Right Burnt-Orange Dry-Brush Stroke */}
        <div className="pricing-brush-bottomright">
          <svg
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pricing-brush-svg"
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

      <div className="wrap pricing-inner">
        {/* ============================================================
            SECTION INTRODUCTION
            ============================================================ */}
        <div ref={headingRef} className="reveal pricing-header">
          {/* Small Orange Handwritten Label + Spaced Monospace */}
          <div className="pricing-plate-row">
            <span className="pricing-plate-num">{t("pricing.chapter")}</span>
            <span className="pricing-plate-dash">—</span>
            <span className="pricing-plate-label">{t("pricing.eyebrow")}</span>
          </div>

          {/* Editorial Serif Heading with Hand-Painted Orange Underline */}
          <div className="pricing-title-box">
            <h2 className="pricing-title">{t("pricing.heading")}</h2>
            <svg
              className="pricing-title-underline"
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
          <p className="pricing-lede">{t("pricing.lede")}</p>
        </div>

        {/* ============================================================
            THREE MAIN PRICING CARDS
            ============================================================ */}
        <div ref={tiersRef} className="reveal pricing-cards-section">
          <div className="pricing-cards-grid">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`pricing-card-wrap ${
                  tier.featured ? "pricing-card-featured" : ""
                } ${tier.hasCornerAccent ? "has-corner-accent" : ""}`}
              >
                {/* Featured Badge with Crown for Colour Painting */}
                {tier.featured && (
                  <div className="pricing-card-badge">
                    <Crown size={12} fill="#FFFFFF" strokeWidth={0} className="pricing-badge-crown" />
                    <span>{t("pricing.mostRequested")}</span>
                  </div>
                )}

                {/* Corner Dry-Brush Accent for Pencil & Charcoal */}
                {tier.hasCornerAccent && (
                  <div className="pricing-card-corner-brush" aria-hidden="true">
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

                <div className="pricing-card">
                  {/* Left Column: Artwork Image Mount on Deckled Paper */}
                  <div className="pricing-card-art">
                    <div className="pricing-card-art-mount">
                      <img
                        src={tier.image}
                        alt={tier.title}
                        className="pricing-card-img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right Column: Title, Description, Sizing Rows & CTA */}
                  <div className="pricing-card-body">
                    <div className="pricing-card-header-info">
                      <h3 className="pricing-card-title">{tier.title}</h3>
                      <p className="pricing-card-desc">{tier.description}</p>
                    </div>

                    <div className="pricing-rows-box">
                      {tier.sizes.map((s) => (
                        <div key={s.label} className="pricing-size-row">
                          <span className="pricing-size-label">{s.label}</span>
                          <span className="pricing-dotted-leader" aria-hidden="true" />
                          <span className="pricing-size-price">{s.price}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={
                        site.whatsappNumber
                          ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
                              `Hi Deepak! I'd like to request a quote for ${tier.title}.`
                            )}`
                          : "#contact"
                      }
                      target={site.whatsappNumber ? "_blank" : undefined}
                      rel={site.whatsappNumber ? "noreferrer" : undefined}
                      className="pricing-card-btn"
                      data-cursor="hover"
                    >
                      {t("pricing.requestQuote")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            ADD-ONS & ALSO AVAILABLE PANELS (SIDE BY SIDE ON DESKTOP)
            ============================================================ */}
        <div ref={extraRef} className="reveal pricing-panels-grid">
          {/* Left Panel: Add-ons */}
          <div className="pricing-panel pricing-addons-panel">
            <div className="pricing-panel-header">
              <div className="pricing-panel-title-wrap">
                <h3 className="pricing-panel-title">{t("pricing.addons")}</h3>
                <span className="pricing-panel-label">{t("pricing.addonsEyebrow")}</span>
              </div>
              <svg
                className="pricing-panel-underline"
                viewBox="0 0 140 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6C35 2 85 2 138 5C95 8 50 8 10 7"
                  stroke="#E65312"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="pricing-addons-list">
              {addOns.map((addon) => (
                <div key={addon.label} className="pricing-addon-item">
                  <div className="pricing-addon-left">
                    <span className="pricing-addon-icon">{renderAddonIcon(addon.icon)}</span>
                    <span className="pricing-addon-label">{addon.label}</span>
                  </div>
                  <span className="pricing-addon-price">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Also Available */}
          <div className="pricing-panel pricing-also-panel">
            <div className="pricing-panel-header">
              <div className="pricing-panel-title-wrap">
                <h3 className="pricing-panel-title">{t("pricing.alsoAvailable")}</h3>
                <span className="pricing-panel-label">{t("pricing.alsoAvailableEyebrow")}</span>
              </div>
              <svg
                className="pricing-panel-underline"
                viewBox="0 0 180 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6C45 2 110 2 178 5C125 8 65 8 12 7"
                  stroke="#E65312"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="pricing-also-grid">
              {alsoAvailable.map((item) => (
                <div key={item.title} className="pricing-also-col">
                  <div className="pricing-also-icon-box">
                    <div className="pricing-also-icon-splash" aria-hidden="true" />
                    <span className="pricing-also-icon">{renderAlsoIcon(item.icon)}</span>
                  </div>
                  <h4 className="pricing-also-title">{item.title}</h4>
                  <p className="pricing-also-desc">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            PANORAMIC BOTTOM CTA BANNER (TORN-PAPER STRIP)
            ============================================================ */}
        <div ref={ctaRef} className="reveal pricing-cta-banner-section">
          <div className="pricing-cta-banner-wrap">
            <div className="pricing-cta-banner">
              {/* Left Column: Realistic Eye Drawing with Orange Dry-Brush Flare */}
              <div className="pricing-cta-banner-left">
                <img
                  src="/gallery/commission-cta-eye.png"
                  alt=""
                  className="pricing-cta-eye-img"
                  loading="lazy"
                />
              </div>

              {/* Center Divider Line */}
              <div className="pricing-cta-banner-divider" aria-hidden="true" />

              {/* Center Content: Heading & Description */}
              <div className="pricing-cta-banner-content">
                <div className="pricing-cta-title-box">
                  <h3 className="pricing-cta-title">{t("pricing.ctaHeading")}</h3>
                  <svg
                    className="pricing-cta-title-underline"
                    viewBox="0 0 260 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8C45 3 130 2 255 6C175 11 90 11 12 9"
                      stroke="#E65312"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="pricing-cta-desc">{t("pricing.ctaLede")}</p>
              </div>

              {/* Right Action: Get a Custom Quote Button */}
              <div className="pricing-cta-banner-action">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pricing-cta-btn"
                  data-cursor="hover"
                >
                  <Instagram size={18} strokeWidth={2} />
                  <span>{t("pricing.ctaButton")}</span>
                </a>
              </div>

              {/* Far Right Corner Burnt-Orange Dry-Brush Accent */}
              <div className="pricing-cta-banner-corner" aria-hidden="true">
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
