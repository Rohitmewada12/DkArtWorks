import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ items, index, onClose, onNav }) {
  const art = items[index];

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

  return (
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
        <img src={art.image} alt={art.title} />
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
    </div>
  );
}
