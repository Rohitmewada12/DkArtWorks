import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { getSanitizedWhatsAppNumber } from "../utils/bookingSubmission.js";
import "./contact.css";

export default function Contact() {
  const { t } = useLang();
  const ref = useReveal();
  const { openBooking } = useBooking();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [giftAddon, setGiftAddon] = useState(null);

  useEffect(() => {
    function handleGiftSelected(e) {
      if (e.detail && e.detail.enabled) {
        setGiftAddon(e.detail);
        // Pre-fill or append gift wrap info to the message if not already present
        const giftSummary = `[Gift Wrapping: ${e.detail.packageName} (${e.detail.priceDisplay}) for ${e.detail.recipientName || "Recipient"} (${e.detail.occasion})${e.detail.personalMessage ? ` — Note: "${e.detail.personalMessage}"` : ""}]`;
        setForm((prev) => {
          if (!prev.message.includes("Gift Wrapping:")) {
            return {
              ...prev,
              message: prev.message ? `${prev.message}\n\n${giftSummary}` : giftSummary,
            };
          }
          return prev;
        });
      } else {
        setGiftAddon(null);
      }
    }

    window.addEventListener("dkarts:gift_selected", handleGiftSelected);
    return () => window.removeEventListener("dkarts:gift_selected", handleGiftSelected);
  }, []);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const giftNotice = giftAddon && giftAddon.enabled
      ? ` (+ ${giftAddon.packageName})`
      : "";
    const subject = encodeURIComponent(
      `Commission enquiry from ${form.name || "your website"}${giftNotice}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section contact-section" aria-label="DK Arts — Contact / Start a Commission">
      {/* ============================================================
          WARM HANDMADE DRAWING-PAPER BACKGROUND & DECORATIONS
          ============================================================ */}
      <div className="contact-bg-decorations" aria-hidden="true">
        {/* Faint Pencil Hatching Strokes near upper-center background */}
        <div className="contact-top-hatching">
          <img
            src="/gallery/contact-pencil-hatching-top.png"
            alt=""
            className="contact-hatching-img"
          />
        </div>

        {/* Soft Warm Paper Vignette */}
        <div className="contact-texture-vignette" />
      </div>

      <div className="wrap contact-container">
        {/* ============================================================
            LEFT COLUMN (40%): SECTION INTRO, CONTACT BUTTONS, ART TOOLS
            ============================================================ */}
        <div ref={ref} className="reveal contact-left-col">
          {/* Top Handwritten Label: Closing note */}
          <div className="contact-handwritten-label">Closing note</div>

          {/* Eyebrow: — GET IN TOUCH */}
          <div className="contact-eyebrow-row">
            <span className="contact-eyebrow-dash">—</span>
            <span className="contact-eyebrow-text">GET IN TOUCH</span>
          </div>

          {/* Main Heading: Start a commission */}
          <div className="contact-heading-wrap">
            <h2 className="contact-title">Start a commission</h2>
            <svg
              className="contact-title-underline"
              viewBox="0 0 280 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 8C55 3 155 2 272 6C195 9 105 9 16 8"
                stroke="#E65312"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Description Paragraph */}
          <p className="contact-lede-desc">
            The fastest way to reach me is Instagram — send a DM with your idea. Prefer email or a form? Either works too.
          </p>

          {/* Four Vertically Stacked Contact Buttons */}
          <div className="contact-links-list">
            {/* PRIMARY CENTRAL BOOKING BUTTON */}
            <button
              type="button"
              className="contact-link-btn contact-book-main-btn"
              onClick={() => openBooking({ source: "Contact Section" })}
              data-cursor="hover"
            >
              <div className="contact-link-icon-wrap bk-accent-icon">
                <Sparkles size={18} />
              </div>
              <span className="contact-link-label">
                <strong>Book Artwork Directly</strong> (5-Step Form)
              </span>
              <span className="contact-link-arrow" aria-hidden="true">→</span>
            </button>

            {/* BUTTON 01 — WHATSAPP */}
            {site.whatsappNumber && (
              <a
                href={`https://wa.me/${getSanitizedWhatsAppNumber(site.whatsappNumber)}?text=${encodeURIComponent(
                  site.whatsappMessage || ""
                )}`}
                target="_blank"
                rel="noreferrer"
                className="contact-link-btn"
                data-cursor="hover"
              >
                <div className="contact-link-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </div>
                <span className="contact-link-label">Chat on WhatsApp</span>
                <span className="contact-link-arrow" aria-hidden="true">→</span>
              </a>
            )}

            {/* BUTTON 02 — INSTAGRAM */}
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-link-btn"
              data-cursor="hover"
            >
              <div className="contact-link-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <span className="contact-link-label">@{site.instagramHandle}</span>
              <span className="contact-link-arrow" aria-hidden="true">→</span>
            </a>

            {/* BUTTON 03 — YOUTUBE */}
            <a
              href={site.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-link-btn"
              data-cursor="hover"
            >
              <div className="contact-link-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" stroke="none" fill="currentColor"/>
                </svg>
              </div>
              <span className="contact-link-label">YouTube channel</span>
              <span className="contact-link-arrow" aria-hidden="true">→</span>
            </a>

            {/* BUTTON 04 — EMAIL */}
            {site.contactEmail && (
              <a
                href={`mailto:${site.contactEmail}`}
                className="contact-link-btn"
                data-cursor="hover"
              >
                <div className="contact-link-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <span className="contact-link-label">{site.contactEmail}</span>
                <span className="contact-link-arrow" aria-hidden="true">→</span>
              </a>
            )}
          </div>

          {/* Bottom-Left Art Tools Illustration */}
          <div className="contact-art-tools-decor" aria-hidden="true">
            <img
              src="/gallery/contact-art-tools.png"
              alt=""
              className="contact-tools-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN (60%): TORN-PAPER ENQUIRY FORM & WAX SEAL
            ============================================================ */}
        <div className="contact-right-col">
          <div className="contact-paper-wrap">
            {/* DK Arts Traditional Circular Wax Seal with Jute Twines */}
            <div className="contact-wax-seal" aria-hidden="true">
              <img
                src="/gallery/contact-wax-seal.png"
                alt="DK Arts Wax Seal"
                className="contact-seal-img"
              />
            </div>

            {/* Torn-Paper Parchment Form Sheet */}
            <div className="contact-parchment-sheet">
              <form className="contact-enquiry-form" onSubmit={handleSubmit}>
                {/* FIELD 01 — NAME */}
                <div className="contact-field-group">
                  <label htmlFor="contact-form-name" className="contact-field-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>NAME</span>
                  </label>
                  <input
                    id="contact-form-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    className="contact-field-input"
                  />
                </div>

                {/* FIELD 02 — EMAIL */}
                <div className="contact-field-group">
                  <label htmlFor="contact-form-email" className="contact-field-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <span>EMAIL</span>
                  </label>
                  <input
                    id="contact-form-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className="contact-field-input"
                  />
                </div>

                {/* OPTIONAL GIFT WRAPPING ACTIVE BADGE */}
                {giftAddon && giftAddon.enabled && (
                  <div className="contact-gift-badge">
                    <span className="contact-gift-badge-icon">🎁</span>
                    <div className="contact-gift-badge-info">
                      <strong>Gift Add-on:</strong> {giftAddon.packageName} ({giftAddon.priceDisplay}) for {giftAddon.recipientName || "Recipient"} ({giftAddon.occasion})
                    </div>
                    <button
                      type="button"
                      className="contact-gift-badge-remove"
                      onClick={() => {
                        setGiftAddon(null);
                        setForm((prev) => ({
                          ...prev,
                          message: prev.message.replace(/\[Gift Wrapping:.*?\]\n*/gs, "").trim(),
                        }));
                      }}
                      title="Remove gift wrap"
                      aria-label="Remove gift wrap"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* FIELD 03 — WHAT WOULD YOU LIKE MADE? */}
                <div className="contact-field-group">
                  <label htmlFor="contact-form-message" className="contact-field-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                    </svg>
                    <span>WHAT WOULD YOU LIKE MADE?</span>
                  </label>
                  <textarea
                    id="contact-form-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Portrait, pet, size, occasion — anything helps."
                    className="contact-field-textarea"
                  />
                </div>

                {/* Send Enquiry Button */}
                <button type="submit" className="contact-submit-btn" data-cursor="hover">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-btn-send-icon" aria-hidden="true">
                    <path d="m22 2-7 20-4-9-9-4Z"/>
                    <path d="M22 2 11 13"/>
                  </svg>
                  <span className="contact-btn-text">Send enquiry</span>
                  <span className="contact-btn-arrow" aria-hidden="true">→</span>
                </button>

                {/* Botanical Sprig Divider */}
                <div className="contact-botanical-divider" aria-hidden="true">
                  <span className="contact-divider-hairline" />
                  <img
                    src="/gallery/contact-botanical-sprig.png"
                    alt=""
                    className="contact-botanical-img"
                  />
                  <span className="contact-divider-hairline" />
                </div>

                {/* Email-App Disclaimer */}
                <p className="contact-disclaimer-note">
                  Opens your email app with this filled in — nothing is sent from here directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
