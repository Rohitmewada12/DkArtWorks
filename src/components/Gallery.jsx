import { useMemo, useState } from "react";
import artworks from "../data/artworks.js";
import useReveal from "../useReveal.js";
import ArtCard from "./ArtCard.jsx";
import Lightbox from "./Lightbox.jsx";
import "./gallery.css";
import "./lightbox.css";

const CATEGORIES = ["All", "Sketch", "Painting", "Commission"];

// Bento span pattern applied by position in the (filtered) list, so the
// grid always reads as an intentional, art-directed spread rather than
// a uniform tile wall.
const SPAN_PATTERN = [
  "span-big",
  "span-normal",
  "span-normal",
  "span-wide",
  "span-tall",
  "span-normal",
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const headingRef = useReveal();

  const items = useMemo(
    () =>
      filter === "All"
        ? artworks
        : artworks.filter((a) => a.category === filter),
    [filter]
  );

  function openAt(art) {
    setOpenIndex(items.findIndex((a) => a.id === art.id));
  }

  function nav(dir) {
    setOpenIndex((i) => (i === null ? null : (i + dir + items.length) % items.length));
  }

  return (
    <section id="gallery" className="section gallery">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head gallery-head">
          <div>
            <span className="section-chapter">Scene 01</span>
            <br />
            <span className="eyebrow">Selected work</span>
            <h2>The gallery</h2>
            <p className="section-lede">
              Studies, finished paintings and commissioned portraits — tap
              any piece for a full-screen view.
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
                data-cursor="hover"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {items.map((a, i) => (
            <ArtCard
              key={a.id}
              art={a}
              index={i}
              span={SPAN_PATTERN[i % SPAN_PATTERN.length]}
              onOpen={openAt}
            />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNav={nav}
        />
      )}
    </section>
  );
}
