import { useMemo, useState } from "react";
import { Pencil } from "lucide-react";
import artworks from "../data/artworks.js";
import useReveal from "../useReveal.js";
import "./gallery.css";

const CATEGORIES = ["All", "Sketch", "Painting", "Commission"];

// A handful of hand-tuned rotations/hatch-density per tile index so the
// placeholder grid reads as a sketchbook page rather than a repeated tile.
const TILE_VARIANTS = [
  { rot: -1.4, hatch: 0.35 },
  { rot: 1.1, hatch: 0.55 },
  { rot: -0.6, hatch: 0.25 },
  { rot: 1.6, hatch: 0.45 },
  { rot: -1.1, hatch: 0.3 },
  { rot: 0.8, hatch: 0.5 },
];

function PlaceholderTile({ index }) {
  const v = TILE_VARIANTS[index % TILE_VARIANTS.length];
  return (
    <div
      className="art-placeholder"
      style={{ "--rot": `${v.rot}deg`, "--hatch": v.hatch }}
    >
      <Pencil size={20} strokeWidth={1.5} />
      <span>Add photo</span>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const headingRef = useReveal();

  const items = useMemo(
    () =>
      filter === "All"
        ? artworks
        : artworks.filter((a) => a.category === filter),
    [filter]
  );

  return (
    <section id="gallery" className="section gallery">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head">
          <span className="eyebrow">Selected work</span>
          <h2>A page from the sketchbook</h2>
          <p className="section-lede">
            A running collection of studies, finished paintings and
            commissioned pieces — swap these placeholders for real photos in{" "}
          </p>
        </div>

        <div className="gallery-filters" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`filter-pill ${filter === c ? "active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {items.map((a, i) => (
            <figure key={a.id} className="art-card">
              {a.image ? (
                <img src={a.image} alt={a.title} loading="lazy" />
              ) : (
                <PlaceholderTile index={i} />
              )}
              <figcaption>
                <span className="art-title">{a.title}</span>
                <span className="art-medium">{a.medium}</span>
              </figcaption>
              <span className="art-tag">{a.category}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
