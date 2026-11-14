import { useState } from "react";
import { ExternalLink, Maximize2, MessageCircle, Palette, Sparkles } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import { useBooking } from "../context/BookingContext.jsx";
import { getSanitizedWhatsAppNumber } from "../utils/bookingSubmission.js";

function mapCategoryToArtworkType(cat) {
  if (!cat) return "Portrait";
  const lower = cat.toLowerCase();
  if (lower.includes("painting")) return "Custom Painting";
  if (lower.includes("anime")) return "Anime / Cartoon Art";
  if (lower.includes("pet")) return "Pet Portrait";
  return "Portrait";
}

export default function ArtCard({ art, index, onOpen, viewMode = "grid" }) {
  const ref = useReveal({ threshold: 0.05 });
  const [loaded, setLoaded] = useState(false);
  const { openBooking } = useBooking();

  const cleanWhatsAppNumber = getSanitizedWhatsAppNumber(site.whatsappNumber);
  const whatsAppUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    `Hi Deepak! 👋 I saw "${art.title}" (${art.medium}) in your gallery on your website and would love to ask about commissioning something similar.`
  )}`;

  const handleBookSimilar = (e) => {
    e.stopPropagation();
    openBooking({
      sourceTitle: art.title,
      sourceType: art.category,
      artworkType: mapCategoryToArtworkType(art.category),
      subject: art.title,
      medium: art.medium,
      artworkImage: art.image || art.thumb,
      source: `Gallery — ${art.title}`,
    });
  };

  if (viewMode === "list") {
    // Eagerly fetch initial visible items to eliminate loading delay
    const isPriority = index < 6;

    return (
      <div
        ref={ref}
        className="art-list-item in-view"
        onClick={() => onOpen && onOpen(art)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen && onOpen(art);
          }
        }}
        role="button"
        tabIndex={0}
        data-cursor="hover"
        aria-label={`View ${art.title}`}
      >
        <div className={`art-list-media ${loaded ? "is-loaded" : ""}`}>
          <img
            src={art.thumb || art.image}
            alt={art.title}
            className={`art-list-img ${loaded ? "is-loaded" : ""}`}
            loading={isPriority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
        </div>

        <div className="art-list-content">
          <span className="art-list-category">{art.category}</span>
          <h3 className="art-list-title">{art.title}</h3>
          <p className="art-list-medium">
            <Palette size={16} strokeWidth={1.8} className="art-list-medium-icon" aria-hidden="true" />
            <span>{art.medium}</span>
          </p>
          {art.description && (
            <p className="art-list-desc">{art.description}</p>
          )}
        </div>

        <div className="art-list-controls">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="art-list-wa-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Ask on WhatsApp about ${art.title}`}
            title="Ask on WhatsApp"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            className="art-list-book-btn"
            onClick={handleBookSimilar}
            aria-label={`Book similar to ${art.title}`}
          >
            <Sparkles size={16} strokeWidth={1.9} className="art-list-btn-icon" />
            <span>Book Similar</span>
          </button>

          <button
            type="button"
            className="art-list-view-btn"
            aria-label={`Open ${art.title} in full screen`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen && onOpen(art);
            }}
          >
            <span>View Artwork</span>
            <ExternalLink size={15} strokeWidth={1.8} className="art-list-view-btn-icon" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <figure
      ref={ref}
      className="art-card stagger"
      style={{ "--stagger-delay": `${(index % 8) * 0.04}s` }}
    >
      <div
        className={`art-card-inner ${loaded ? "is-loaded" : ""}`}
        data-cursor="hover"
        onClick={() => onOpen && onOpen(art)}
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
        aria-label={`View ${art.title}`}
      >
        <img
          src={art.thumb || art.image}
          alt={art.title}
          loading="lazy"
          decoding="async"
          className="art-card-img"
          onLoad={() => setLoaded(true)}
        />

        <div className="art-card-scrim" aria-hidden="true" />

        <div className="art-card-info">
          <div className="art-card-meta">
            <h3 className="art-card-title">{art.title}</h3>
            <p className="art-card-medium">{art.medium}</p>
          </div>

          <div className="art-card-actions-wrap">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="art-card-quick-wa"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ask on WhatsApp about ${art.title}`}
              title="Ask on WhatsApp"
            >
              <MessageCircle size={14} />
            </a>

            <button
              type="button"
              className="art-card-quick-book"
              onClick={handleBookSimilar}
              aria-label={`Book similar to ${art.title}`}
              title="Book similar artwork"
            >
              <span>Book Similar</span>
            </button>

            <span
              className="art-card-expand-icon"
              aria-hidden="true"
            >
              <Maximize2 size={16} strokeWidth={1.8} />
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
