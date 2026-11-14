import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import { getSanitizedWhatsAppNumber } from "../utils/bookingSubmission.js";
import "./faq.css";

const FAQ_ITEMS = [
  {
    q: "Can you combine people from two different photos into one portrait?",
    a: "Yes, absolutely! This is one of my most requested commissions. If you have separate photos of family members, couples without a good joint picture, or loved ones who have passed away, I carefully balance their lighting, perspective, and facial scale to create a natural, unified portrait as if they sat together.",
    tag: "POPULAR",
  },
  {
    q: "What kind of reference photo works best for a realistic sketch?",
    a: "Clear, well-lit photos taken in natural daylight where facial features — especially the eyes and smile lines — are in sharp focus yield the most lifelike results. Avoid heavy beautification filters, night flash, or cropped screenshots. If you are unsure, feel free to send 2–4 photos and I will help you choose the best one!",
    hasPhotoGuideBtn: true,
  },
  {
    q: "How does the sketch approval stage work? What if I want changes?",
    a: "There are zero surprises at the end. Once the initial proportions and facial outline are drawn, I send you clear progress photos for your approval. You can request any tweaks to expressions, hair, or angles. Only after you are 100% satisfied with the likeness do I proceed to final detailed shading.",
  },
  {
    q: "How do payments work? Do I pay everything upfront?",
    a: "No full upfront payment is required. A 50% advance deposit confirms your booking slot and allows me to begin the artwork. The remaining 50% balance is only payable after the completed portrait is photographed, shared with you, and fully approved before dispatch.",
  },
  {
    q: "How is the artwork packed so it doesn't get bent or damaged in courier transit?",
    a: "Safety during transit is 100% guaranteed. Unframed pieces are wrapped in archival acid-free glassine paper to prevent graphite smudging and shipped in ultra-thick, rigid PVC tubes. Framed portraits are cushioned with multi-layer bubble wrap, reinforced corner protectors, and sealed in rigid transit packaging.",
  },
  {
    q: "How long does a portrait take, and do you offer rush delivery?",
    a: "Standard completion takes 4 to 8 business days depending on size and number of faces, followed by 3–5 days for pan-India courier delivery. If you have an urgent anniversary or birthday deadline, you can choose Express Rush Delivery (48–72 hours dispatch priority).",
  },
  {
    q: "Can you include a personalized handwritten note or gift packaging?",
    a: "Yes! We offer handmade craft gift wrapping, sealed with a real hot wax stamp and an archival handwritten calligraphy message card, ready to be gifted directly to your recipient.",
  },
];

export default function Faq({ onOpenPhotoGuide }) {
  const headingRef = useReveal();
  const listRef = useReveal({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);

  const cleanWhatsAppNumber = getSanitizedWhatsAppNumber(site.whatsappNumber);

  const toggle = (idx) => {
    setOpenIndex((cur) => (cur === idx ? -1 : idx));
  };

  return (
    <section id="faq" className="section faq-section" aria-label="DK Arts — Frequently Asked Questions">
      {/* Texture and artistic paper backgrounds */}
      <div className="faq-bg-decorations" aria-hidden="true">
        <div className="faq-texture-noise" />
        <div className="faq-texture-vignette" />
        <div className="faq-brush-topright">
          <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M260 -10C215 15 150 45 50 75C100 82 170 60 250 32" fill="#E65312" opacity="0.85" />
            <path d="M270 18C195 42 120 72 10 115C70 120 155 95 255 50" fill="#E65312" opacity="0.75" />
          </svg>
        </div>
      </div>

      <div className="wrap faq-inner">
        {/* Header */}
        <div ref={headingRef} className="reveal faq-header">
          <div className="faq-plate-row">
            <span className="faq-plate-num">Plate 05</span>
            <span className="faq-plate-dash">—</span>
            <span className="faq-plate-label">QUESTIONS &amp; REASSURANCE</span>
          </div>

          <div className="faq-title-box">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <svg
              className="faq-title-underline"
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

          <p className="faq-lede">
            Everything you need to know about commissioning a handmade portrait, sketch approval, safe shipping across India, and reference photos.
          </p>
        </div>

        {/* Accordion List */}
        <div ref={listRef} className="reveal faq-list-wrap">
          <div className="faq-accordion-list">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.q}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                    data-cursor="hover"
                  >
                    <div className="faq-q-left">
                      <span className="faq-q-num">0{idx + 1}</span>
                      <span className="faq-q-text">{item.q}</span>
                    </div>

                    <div className="faq-q-right">
                      {item.tag && <span className="faq-item-tag">{item.tag}</span>}
                      <span className={`faq-chevron ${isOpen ? "is-rotated" : ""}`}>
                        <ChevronDown size={18} />
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p className="faq-answer-text">{item.a}</p>

                      {item.hasPhotoGuideBtn && onOpenPhotoGuide && (
                        <button
                          type="button"
                          onClick={onOpenPhotoGuide}
                          className="faq-guide-btn"
                          data-cursor="hover"
                        >
                          <HelpCircle size={14} />
                          <span>View Reference Photo Quality Guide</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Strip Below Accordion */}
          <div className="faq-help-strip">
            <div className="faq-help-text">
              <strong>Have a unique custom request or deadline?</strong>
              <span>Talk directly with artist Deepak Mewada on WhatsApp for an instant response.</span>
            </div>
            <a
              href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
                "Hi Deepak! I have a question about getting a custom artwork commissioned."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="faq-wa-link"
              data-cursor="hover"
            >
              <MessageCircle size={16} />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
