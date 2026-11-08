import React from "react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./about.css";

const TOOLS = [
  { id: "graphite", label: "Graphite", img: "/gallery/Graphite.png" },
  { id: "charcoal", label: "Charcoal", img: "/gallery/Charcoal.png" },
  { id: "ink", label: "Ink", img: "/gallery/Ink.png" },
  { id: "watercolour", label: "Watercolour", img: "/gallery/Watercolour.png" },
  { id: "acrylic", label: "Acrylic", img: "/gallery/Acrylic.png" },
  { id: "coloured-pencil", label: "Coloured Pencil", img: "/gallery/Coloured-pencil.png" },
];

export default function About() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section id="about" className="section about-studio" aria-label="DK Arts — The Artist Behind the Artwork">
      {/* ============================================================
          WARM HANDMADE DRAWING-PAPER TEXTURE & ARTISTIC DECORATIONS
          ============================================================ */}
      <div className="about-bg-decorations" aria-hidden="true">
        {/* Fine Paper Grain Noise */}
        <div className="about-texture-noise" />

        {/* Soft Warm Paper Vignette */}
        <div className="about-texture-vignette" />

        {/* Upper-Left Burnt-Orange Dry-Brush Stroke */}
        <div className="about-brush-topleft">
          <svg
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="about-brush-svg"
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

        {/* Lower-Left Burnt-Orange Dry-Brush Accent */}
        <div className="about-brush-bottomleft">
          <img
            src="/gallery/brushstroke.png"
            alt=""
            className="about-brushstroke-img"
          />
        </div>

        {/* Lower-Right Pencil Sketch Decoration with Curled Shavings */}
        <div className="about-pencil-decor">
          <img
            src="/gallery/pencil-shavings.png"
            alt=""
            className="about-pencil-img"
          />
        </div>
      </div>

      <div className="wrap about-inner">
        {/* ============================================================
            LEFT COLUMN: LAYERED TORN-PAPER ARTIST PORTRAIT
            ============================================================ */}
        <div className="about-portrait-col">
          <div className="about-paper-stack">
            {/* Layer 1 (Bottom): Muted Deckled Craft Sheet Frame */}
            <div className="about-paper-base" aria-hidden="true">
              <img
                src="/gallery/polaroid-frame.png"
                alt=""
                className="about-polaroid-frame-asset"
              />
            </div>

            {/* Layer 2 (Middle): Cream Deckled Paper Sheet */}
            <div className="about-paper-middle" aria-hidden="true" />

            {/* Layer 3 (Top): Main Photo Frame with Orange Craft Tape */}
            <div className="about-photo-frame">
              {/* Burnt-Orange Craft Tape at top center */}
              <div className="about-frame-tape" aria-hidden="true" />

              {/* Real Artist Photograph */}
              <div className="about-photo-inner">
                <img
                  src="/gallery/artist.jpg"
                  alt={site.fullName}
                  className="about-artist-img"
                />
              </div>

              {/* Bottom Photo Caption */}
              <div className="about-photo-caption">DK ARTS STUDIO</div>
            </div>

            {/* Circular Rubber Stamp: REALIST ARTIST */}
            <div className="about-stamp-wrap" aria-hidden="true">
              <img
                src="/gallery/realist-stamp.png"
                alt="Realist Artist Stamp"
                className="about-stamp-img"
              />
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: EDITORIAL CONTENT, QUOTE & MEDIUMS
            ============================================================ */}
        <div ref={ref} className="reveal about-content-col">
          {/* Top Label: — ABOUT THE ARTIST */}
          <div className="about-label-row">
            <span className="about-label-dash">—</span>
            <span className="about-label-text">ABOUT THE ARTIST</span>
          </div>

          {/* Main Heading: DEEPAK MEWADA */}
          <div className="about-title-box">
            <h2 className="about-artist-title">{site.fullName}</h2>
            <svg
              className="about-title-underline"
              viewBox="0 0 320 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 10C65 4 175 3 312 8C225 14 110 14 16 12"
                stroke="#E65312"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Artist Biography Paragraphs */}
          <div className="about-bio-box">
            {site.bio.map((paragraph, idx) => (
              <p key={idx} className="about-bio-p">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Large Torn-Paper Quote Panel */}
          <div className="about-quote-panel-wrap">
            <div className="about-quote-panel">
              <span className="about-quote-marks" aria-hidden="true">
                “
              </span>
              <div className="about-quote-divider" aria-hidden="true" />
              <blockquote className="about-quote-text">
                "Every stroke of the pencil carries intention. A great portrait is not just about capturing facial features, but bottling the soul and memory of that person forever."
              </blockquote>
            </div>
          </div>

          {/* Tools & Mediums Row */}
          <div className="about-tools-section">
            <h3 className="about-tools-heading">TOOLS &amp; MEDIUMS:</h3>
            <div className="about-tools-grid">
              {TOOLS.map((tool) => (
                <div key={tool.id} className="about-tool-item">
                  <div className="about-tool-illus-wrap">
                    <img
                      src={tool.img}
                      alt={tool.label}
                      className="about-tool-illus-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="about-tool-name">{tool.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thin Divider Line Above Signature */}
          <div className="about-signature-divider" aria-hidden="true" />

          {/* Artist Signature & Studio Designation */}
          <div className="about-signature-box">
            <div className="about-signature-name-wrap">
              <span className="about-signature-hand">Deepak Mewada</span>
              <svg
                className="about-signature-underline"
                viewBox="0 0 200 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6C45 2 110 2 196 5C140 7 70 7 12 6"
                  stroke="#E65312"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="about-signature-designation">
              ARTIST &amp; REALIST, DK ARTS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
