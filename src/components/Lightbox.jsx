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
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        <X size={22} strokeWidth={1.75} />
      </button>

      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Previous piece"
      >
        <ChevronLeft size={26} strokeWidth={1.5} />
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
          <span className="lightbox-title">{art.title}</span>
          <span className="lightbox-medium">
            {art.medium} · {art.category}
          </span>
          <span className="lightbox-count">
            {index + 1} / {items.length}
          </span>
        </div>
      </div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label="Next piece"
      >
        <ChevronRight size={26} strokeWidth={1.5} />
      </button>
    </div>,
    document.body
  );
}
