import { useRef, useState } from "react";
import beforeAfter from "../data/beforeAfter.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./beforeafter.css";

export default function BeforeAfter() {
  const { t } = useLang();
  const headingRef = useReveal();
  const cardsRef = useReveal({ threshold: 0.1 });

  // Hidden until the artist adds real reference/finished pairs to
  // src/data/beforeAfter.js — see the comment in that file.
  if (!beforeAfter.length) return null;

  return (
    <section id="transformations" className="section before-after">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head">
          <span className="section-chapter">{t("beforeAfter.chapter")}</span>
          <br />
          <span className="eyebrow">{t("beforeAfter.eyebrow")}</span>
          <h2>{t("beforeAfter.heading")}</h2>
          <p className="section-lede">{t("beforeAfter.lede")}</p>
        </div>

        <div ref={cardsRef} className="before-after-grid stagger-group">
          {beforeAfter.map((item, i) => (
            <SliderCard key={item.title + i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SliderCard({ item }) {
  const { t } = useLang();
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  function updateFromX(clientX) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  function onPointerDown(e) {
    dragging.current = true;
    updateFromX(e.clientX);
  }
  function onPointerMove(e) {
    if (!dragging.current) return;
    updateFromX(e.clientX);
  }
  function stopDrag() {
    dragging.current = false;
  }

  return (
    <figure className="ba-card">
      <div
        className="ba-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
      >
        <img className="ba-img ba-after" src={item.after} alt={`${item.title} — finished piece`} />
        <div className="ba-before-wrap" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img className="ba-img ba-before" src={item.before} alt={`${item.title} — reference photo`} />
        </div>
        <div className="ba-handle" style={{ left: `${pos}%` }}>
          <span className="ba-handle-grip" />
        </div>
        <span className="ba-tag ba-tag-before">{t("beforeAfter.before")}</span>
        <span className="ba-tag ba-tag-after">{t("beforeAfter.after")}</span>
        <input
          className="ba-range"
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t("beforeAfter.sliderLabel")}
        />
      </div>
      {item.title && <figcaption className="ba-caption">{item.title}</figcaption>}
    </figure>
  );
}
