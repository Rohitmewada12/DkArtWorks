import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ items, index, onClose, onNav }) {
  const art = items[index];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav]);

  if (!art) return null;

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose} aria-label="Close viewer">
        <X size={22} strokeWidth={2} />
      </button>

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
        <div className="lightbox-frame">
          {art.thumb && (
            <img className="lightbox-img lightbox-img-blur" src={art.thumb} alt="" aria-hidden="true" />
          )}
          <img
            className={`lightbox-img ${loaded ? "is-loaded" : ""}`}
            src={art.image}
            alt={art.title}
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div className="lightbox-caption">
          <div className="lightbox-heading-row">
            <h3 className="lightbox-title">{art.title}</h3>
            <span className="lightbox-category-tag">{art.category}</span>
          </div>

          <p className="lightbox-medium">{art.medium}</p>

          {art.description && (
            <p className="lightbox-desc">{art.description}</p>
          )}

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
