import React from "react";
import site from "../data/site.js";
import useLang from "../LangContext.jsx";
import "./footer.css";

export default function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-studio" aria-label="DK Arts Studio Footer">
      {/* ============================================================
          WARM HANDMADE DRAWING-PAPER BACKGROUND & CORNER BRUSHSTROKES
          ============================================================ */}
      <div className="footer-bg-decorations" aria-hidden="true">
        {/* Upper-Left Burnt-Orange Dry-Brush Stroke */}
        <div className="footer-brush-topleft">
          <svg viewBox="0 0 160 100" fill="none" preserveAspectRatio="none">
            <path
              d="M-15 -10C25 15 75 42 155 70C110 78 50 55 -15 25"
              fill="#E65312"
              opacity="0.9"
            />
            <path
              d="M-20 18C35 38 95 68 165 95C125 98 60 72 -20 42"
              fill="#E65312"
              opacity="0.72"
            />
          </svg>
        </div>

        {/* Lower-Right Burnt-Orange Dry-Brush Stroke */}
        <div className="footer-brush-bottomright">
          <svg viewBox="0 0 140 90" fill="none" preserveAspectRatio="none">
            <path
              d="M150 100C115 72 65 42 -10 15C35 8 90 30 150 62"
              fill="#E65312"
              opacity="0.85"
            />
            <path
              d="M155 72C105 48 45 20 -20 -5C18 -10 78 12 155 45"
              fill="#E65312"
              opacity="0.65"
            />
          </svg>
        </div>

        {/* Soft Vignette Overlay */}
        <div className="footer-vignette" />
      </div>

      <div className="wrap footer-container">
        {/* ============================================================
            MAIN FOUR-COLUMN SECTION
            ============================================================ */}
        <div className="footer-columns-row">
          {/* ----------------------------------------------------------
              COLUMN 1: BRAND IDENTITY (~31%)
              ---------------------------------------------------------- */}
          <div className="footer-col footer-col-brand">
            {/* Logo: Handwritten orange DK + Serif dark-brown Arts */}
            <a href="#top" className="footer-logo-link" data-cursor="hover">
              <div className="footer-logo-text">
                <span className="footer-logo-dk">DK</span>
                <span className="footer-logo-arts">Arts</span>
              </div>
            </a>

            {/* Subheading: ARTIST & PENCIL REALIST STUDIO */}
            <div className="footer-brand-sub">ARTIST &amp; PENCIL REALIST STUDIO</div>

            {/* Tagline Description */}
            <p className="footer-brand-desc">
              Sketches, paintings &amp; commissioned art,<br />made by hand.
            </p>

            {/* Mountain Sketch along bottom-left */}
            <div className="footer-mountains-decor" aria-hidden="true">
              <img
                src="/gallery/footer-mountains.png"
                alt=""
                className="footer-mountains-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="footer-col-divider" aria-hidden="true" />

          {/* ----------------------------------------------------------
              COLUMN 2: NAVIGATION (~18%)
              ---------------------------------------------------------- */}
          <div className="footer-col footer-col-nav">
            <div className="footer-col-header">
              <span className="footer-col-title">NAVIGATION</span>
              <span className="footer-col-underline" aria-hidden="true" />
            </div>

            <ul className="footer-nav-list">
              <li>
                <a href="#top" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#reels" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10 8 16 12 10 16 10 8" fill="none"/>
                  </svg>
                  <span>Reels</span>
                </a>
              </li>
              <li>
                <a href="#pricing" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
                    <circle cx="7" cy="7" r=".5" fill="currentColor"/>
                  </svg>
                  <span>Pricing</span>
                </a>
              </li>
              <li>
                <a href="#about" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" x2="12" y1="16" y2="12"/>
                    <line x1="12" x2="12.01" y1="8" y2="8"/>
                  </svg>
                  <span>About</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Vertical Separator */}
          <div className="footer-col-divider" aria-hidden="true" />

          {/* ----------------------------------------------------------
              COLUMN 3: GALLERY & MORE (~19%)
              ---------------------------------------------------------- */}
          <div className="footer-col footer-col-nav">
            <div className="footer-col-header">
              <span className="footer-col-title">GALLERY &amp; MORE</span>
              <span className="footer-col-underline" aria-hidden="true" />
            </div>

            <ul className="footer-nav-list">
              <li>
                <a href="#gallery" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                  <span>Gallery</span>
                </a>
              </li>
              <li>
                <a href="#process" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  </svg>
                  <span>Commissions</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>Reviews</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-nav-link" data-cursor="hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Vertical Separator */}
          <div className="footer-col-divider" aria-hidden="true" />

          {/* ----------------------------------------------------------
              COLUMN 4: CONNECT & PENCIL HOLDER (~32%)
              ---------------------------------------------------------- */}
          <div className="footer-col footer-col-connect">
            <div className="footer-col-header">
              <span className="footer-col-title">CONNECT</span>
              <span className="footer-col-underline" aria-hidden="true" />
            </div>

            <div className="footer-connect-body">
              <div className="footer-connect-buttons">
                {/* Instagram Social Card */}
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-card"
                  data-cursor="hover"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span className="footer-social-text">@{site.instagramHandle}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-external-icon" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" x2="21" y1="14" y2="3"/>
                  </svg>
                </a>

                {/* YouTube Social Card */}
                <a
                  href={site.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-card"
                  data-cursor="hover"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                    <polygon points="10 15 15 12 10 9 10 15" stroke="none" fill="currentColor"/>
                  </svg>
                  <span className="footer-social-text">YouTube</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-external-icon" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" x2="21" y1="14" y2="3"/>
                  </svg>
                </a>
              </div>

              {/* Right-Side Pencil Holder Jar Illustration */}
              <div className="footer-pencil-jar-decor" aria-hidden="true">
                <img
                  src="/gallery/footer-pencil-jar.png"
                  alt=""
                  className="footer-jar-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            FULL-WIDTH THIN HORIZONTAL DIVIDER
            ============================================================ */}
        <div className="footer-horizontal-divider" aria-hidden="true" />

        {/* ============================================================
            BOTTOM ROW: COPYRIGHT (LEFT) & CRAFTED FOR (RIGHT)
            ============================================================ */}
        <div className="footer-bottom-row">
          <div className="footer-bottom-left">
            <span className="footer-copy-text">
              © {currentYear} {site.brandName}. Original artwork — please don't reproduce without asking.
            </span>
          </div>

          <div className="footer-bottom-right">
            <span className="footer-crafted-label">Crafted for </span>
            <span className="footer-crafted-name">{site.fullName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
