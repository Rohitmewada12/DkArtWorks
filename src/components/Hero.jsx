import { ArrowDown, Instagram, Pencil, Sparkles, Youtube } from "lucide-react";
import site from "../data/site.js";
import SpinBadge from "./SpinBadge.jsx";
import useLang from "../LangContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import "./hero.css";

export default function Hero() {
  const { t } = useLang();
  const { openBooking } = useBooking();

  return (
    <section id="top" className="hero">
      {/* Background Monochromatic Pencil Artwork Blend */}
      <div className="hero-bg-art" aria-hidden="true">
        <img
          src="/gallery/sketch-portrait-study-2.jpg"
          alt=""
          className="hero-bg-sketch"
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Vertical Studio Watermark on Left Margin */}
      <div className="hero-vertical-label" aria-hidden="true">
        <span className="v-item">DK ARTS</span>
        <span className="v-dot">•</span>
        <span className="v-item">HANDMADE REALISM</span>
        <span className="v-dot">•</span>
        <span className="v-item">EST. 2021</span>
      </div>

      <div className="wrap hero-spread">
        {/* Left Content Area */}
        <div className="hero-content">
          <div className="hero-eyebrow-wrap">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span className="hero-eyebrow">{t("hero.eyebrow")}</span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-line-serif">{t("hero.titleLine1")}</span>
            <span className="hero-line-brush">
              {t("hero.titleAccent")}
              <svg
                className="hero-brush-underline"
                viewBox="0 0 320 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M5 16C65 7 170 4 315 13C245 22 110 24 20 19"
                  stroke="var(--orange)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
              </svg>
            </span>
          </h1>

          <p className="hero-description">{t("hero.description")}</p>

          <div className="hero-actions">
            <button
              type="button"
              onClick={() => openBooking({ source: "Hero Book Button" })}
              className="btn btn-brush-orange"
              data-cursor="hover"
            >
              <Sparkles size={16} />
              <span>Book Your Artwork</span>
            </button>

            <a href="#gallery" className="btn btn-studio-outline" data-cursor="hover">
              <span>{t("hero.exploreGallery")}</span>
            </a>
          </div>

          <div className="hero-social-strip">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              data-cursor="hover"
            >
              <Instagram size={15} strokeWidth={1.8} />
              <span>@{site.instagramHandle}</span>
            </a>

            <span className="hero-social-divider" aria-hidden="true">/</span>

            <a
              href={site.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              data-cursor="hover"
            >
              <Youtube size={15} strokeWidth={1.8} />
              <span>{t("hero.youtube")}</span>
            </a>

            <span className="hero-social-divider" aria-hidden="true">/</span>

            <span className="hero-artist-tag">
              <Sparkles size={13} strokeWidth={1.8} className="hero-sparkle" />
              <span>Pencil &amp; Graphite Studio</span>
            </span>
          </div>
        </div>

        {/* Right Artwork Composition: Layered Torn Paper, Orange Brushstroke, Portrait, Pencil & Signature */}
        <div className="hero-artwork-area">
          <div className="hero-composition">
            {/* Layer 0: Burnt Orange Watercolor Brush Stroke Behind */}
            <div className="art-brush-stroke" aria-hidden="true">
              <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40 220C120 130 290 90 440 180C490 220 470 330 390 400C310 470 170 480 80 410C20 360 -10 270 40 220Z"
                  fill="var(--orange)"
                  opacity="0.22"
                />
                <path
                  d="M90 180C170 110 320 80 430 160C470 200 450 300 380 370C310 440 190 440 110 380C50 330 30 240 90 180Z"
                  fill="var(--orange-deep)"
                  opacity="0.14"
                />
              </svg>
            </div>

            {/* Layer 1: Bottom Torn Paper Sheet (Craft/Parchment with Offset Tilt) */}
            <div className="art-paper-layer-back" aria-hidden="true" />

            {/* Layer 2: Main Torn Beige Handmade Paper Mount */}
            <div className="art-paper-mount">
              {/* Paper Texture and Sketch Ticks */}
              <div className="art-paper-header" aria-hidden="true">
                <span className="paper-plate-mark">NO. 718 — ATELIER</span>
                <span className="paper-dim-mark">300 GSM COLD PRESS</span>
              </div>

              {/* The Actual Artist Photograph */}
              <div className="art-portrait-wrap">
                <img
                  src="/gallery/artist.jpg"
                  alt={`${site.fullName} - Artist in studio`}
                  className="art-portrait-img"
                />
                <div className="art-photo-corner top-left" aria-hidden="true" />
                <div className="art-photo-corner bottom-right" aria-hidden="true" />
              </div>

              {/* Artist Signature & Notes on Paper */}
              <div className="art-paper-footer">
                <div className="art-signature-block">
                  <span className="art-hand-signature">{site.fullName}</span>
                  <span className="art-sig-sub">Master Realist &amp; Portraitist</span>
                </div>

                <div className="art-seal-stamp" aria-hidden="true">
                  <span className="seal-round">VERIFIED</span>
                </div>
              </div>

              {/* Realistic SVG Artist Pencil Resting across the Paper Corner */}
              <div className="art-pencil-illustration" aria-hidden="true">
                <svg
                  viewBox="0 0 220 40"
                  width="220"
                  height="40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="pencilWood" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C47335" />
                      <stop offset="35%" stopColor="#E29252" />
                      <stop offset="70%" stopColor="#AD5C20" />
                      <stop offset="100%" stopColor="#7E3E10" />
                    </linearGradient>
                    <linearGradient id="pencilCone" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F5DFBF" />
                      <stop offset="50%" stopColor="#E6CB9E" />
                      <stop offset="100%" stopColor="#CCA874" />
                    </linearGradient>
                    <linearGradient id="ferrule" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#A89E90" />
                      <stop offset="50%" stopColor="#E4DDD3" />
                      <stop offset="100%" stopColor="#6E6558" />
                    </linearGradient>
                  </defs>
                  {/* Drop Shadow */}
                  <path
                    d="M3 24L38 18L185 18L215 18L185 28L38 28Z"
                    fill="#000000"
                    opacity="0.4"
                    filter="blur(3px)"
                  />
                  {/* Ferrule (Metal Cap at end) */}
                  <rect x="180" y="8" width="30" height="16" rx="2" fill="url(#ferrule)" />
                  <line x1="187" y1="8" x2="187" y2="24" stroke="#4D453A" strokeWidth="1" />
                  <line x1="195" y1="8" x2="195" y2="24" stroke="#4D453A" strokeWidth="1" />
                  {/* Hexagonal Pencil Body */}
                  <rect x="36" y="8" width="144" height="16" fill="url(#pencilWood)" rx="1" />
                  {/* Facet Lines */}
                  <line x1="36" y1="13" x2="180" y2="13" stroke="#F6AA6E" strokeWidth="1" opacity="0.6" />
                  <line x1="36" y1="19" x2="180" y2="19" stroke="#5C2B09" strokeWidth="1.2" opacity="0.8" />
                  {/* Pencil Imprint / Lettering */}
                  <text
                    x="75"
                    y="17"
                    fill="#FDE6C8"
                    fontFamily="var(--font-mono)"
                    fontSize="5.5"
                    letterSpacing="0.8"
                    opacity="0.85"
                  >
                    DK ARTS ★ 6B GRAPHITE
                  </text>
                  {/* Sharpened Wood Cone */}
                  <polygon points="36,8 6,16 36,24" fill="url(#pencilCone)" />
                  {/* Wood Growth Rings Detail */}
                  <path d="M28 10C24 13 24 19 28 22" stroke="#B8935D" strokeWidth="0.8" fill="none" opacity="0.7" />
                  {/* Exposed Graphite Core & Sharp Tip */}
                  <polygon points="12,14.5 2,16 12,17.5" fill="#1C1A18" />
                </svg>
              </div>
            </div>

            {/* Floating Spinning Seal Badge */}
            <div className="hero-spinning-badge">
              <SpinBadge size={114} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator with Flanking Decorative Lines */}
      <div className="hero-scroll-bar">
        <span className="scroll-line" aria-hidden="true" />
        <a href="#gallery" className="hero-scroll-btn" data-cursor="hover">
          <div className="mouse-indicator" aria-hidden="true">
            <span className="mouse-wheel" />
          </div>
          <span className="scroll-text">{t("hero.scroll")}</span>
          <ArrowDown size={14} strokeWidth={2} className="scroll-arrow" />
        </a>
        <span className="scroll-line" aria-hidden="true" />
      </div>
    </section>
  );
}
