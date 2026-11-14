import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Search,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import site from "../data/site.js";
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

export default function Lightbox({ items, index, onClose, onNav }) {
  const art = items[index];
  const [loaded, setLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef(null);
  const { openBooking } = useBooking();

  const cleanWhatsAppNumber = getSanitizedWhatsAppNumber(site.whatsappNumber);

  useEffect(() => {
    setLoaded(false);
    setIsZoomed(false);
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav, isZoomed]);

  if (!art) return null;

  const handleMouseMove = (e) => {
    if (!isZoomed || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleFrameClick = (e) => {
    e.stopPropagation();
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
    setIsZoomed((z) => !z);
  };

  const whatsAppUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    `Hi Deepak! 👋 I was looking at "${art.title}" (${art.medium}) in your gallery lightbox on your website and would love to ask about commissioning a similar artwork.`
  )}`;

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      {/* Top Controls: Zoom Toggle & Close */}
      <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`lightbox-tool-btn ${isZoomed ? "is-active" : ""}`}
          onClick={() => setIsZoomed((z) => !z)}
          aria-label={isZoomed ? "Reset zoom" : "Inspect fine details"}
          title={isZoomed ? "Click to reset zoom" : "Click to inspect fine pencil & brush strokes"}
        >
          {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          <span className="lightbox-tool-label">
            {isZoomed ? "Reset" : "Inspect Details (2.5x)"}
          </span>
        </button>

        <button className="lightbox-close" onClick={onClose} aria-label="Close viewer">
          <X size={22} strokeWidth={2} />
        </button>
      </div>

      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Previous artwork"
      >
        <ChevronLeft size={28} strokeWidth={2} />
      </button>

      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        {/* Frame with Zoomable Artwork */}
        <div
          ref={frameRef}
          className={`lightbox-frame ${isZoomed ? "is-zoomed" : ""}`}
          onClick={handleFrameClick}
          onMouseMove={handleMouseMove}
          title={isZoomed ? "Move cursor to pan • Click to reset" : "Click to zoom into pencil strokes"}
        >
          {art.thumb && (
            <img className="lightbox-img lightbox-img-blur" src={art.thumb} alt="" aria-hidden="true" />
          )}
          <img
            className={`lightbox-img ${loaded ? "is-loaded" : ""}`}
            src={art.image}
            alt={art.title}
            style={
              isZoomed
                ? {
                    transform: "scale(2.5)",
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                    cursor: "zoom-out",
                  }
                : { cursor: "zoom-in" }
            }
            onLoad={() => setLoaded(true)}
          />

          {isZoomed && (
            <div className="lightbox-zoom-hint" aria-hidden="true">
              Move cursor to inspect graphite texture • Click to reset
            </div>
          )}
        </div>

        {/* Captions and Conversion Actions */}
        <div className="lightbox-caption">
          <div className="lightbox-heading-row">
            <h3 className="lightbox-title">{art.title}</h3>
            <span className="lightbox-category-tag">{art.category}</span>
          </div>

          <p className="lightbox-medium">{art.medium}</p>

          {art.description && (
            <p className="lightbox-desc">{art.description}</p>
          )}

          <div className="lightbox-booking-row">
            {/* WhatsApp Direct Enquiry */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="lightbox-wa-btn"
              data-cursor="hover"
            >
              <MessageCircle size={16} />
              <span>Ask on WhatsApp</span>
            </a>

            {/* Customizer Booking Modal */}
            <button
              type="button"
              className="lightbox-book-btn"
              onClick={() => {
                onClose();
                openBooking({
                  sourceTitle: art.title,
                  sourceType: art.category,
                  artworkType: mapCategoryToArtworkType(art.category),
                  subject: art.title,
                  medium: art.medium,
                  artworkImage: art.image || art.thumb,
                  source: `Lightbox — ${art.title}`,
                });
              }}
              data-cursor="hover"
            >
              <Sparkles size={15} />
              <span>Commission Similar Artwork</span>
            </button>
          </div>

          <span className="lightbox-count">
            Piece {index + 1} of {items.length}
          </span>
        </div>
      </div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label="Next artwork"
      >
        <ChevronRight size={28} strokeWidth={2} />
      </button>
    </div>,
    document.body
  );
}
