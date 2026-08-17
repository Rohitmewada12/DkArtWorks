import { useRef } from "react";
import { Maximize2 } from "lucide-react";
import useReveal from "../useReveal.js";

const TILE_TAPE_ROT = [-8, 6, -5, 9, -7, 5, -4, 8];

export default function ArtCard({ art, index, span = "", onOpen }) {
  const tapeRot = TILE_TAPE_ROT[index % TILE_TAPE_ROT.length];
  const ref = useReveal({ threshold: 0.1 });
  const cardRef = useRef(null);

  function handleMove(e) {
    const el = cardRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  }

  function handleLeave() {
    const el = cardRef.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg) translateY(0)";
  }

  return (
    <figure
      ref={ref}
      className={`art-card stagger ${span}`}
      style={{ "--stagger-delay": `${(index % 6) * 0.07}s` }}
    >
      <div
        ref={cardRef}
        className="art-card-inner"
        data-cursor="hover"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => onOpen && onOpen(art)}
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
      >
        <span
          className="tape"
          style={{ top: "-9px", left: "16px", transform: `rotate(${tapeRot}deg)` }}
          aria-hidden="true"
        />
        <img src={art.image} alt={art.title} loading="lazy" />

        <div className="art-overlay">
          <span className="art-overlay-title">{art.title}</span>
          <span className="art-overlay-medium">{art.medium}</span>
          <Maximize2 size={15} strokeWidth={1.75} className="art-overlay-icon" />
        </div>

        <span className="art-tag">{art.category}</span>
      </div>
    </figure>
  );
}
