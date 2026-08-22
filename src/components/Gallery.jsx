import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import artworks from "../data/artworks.js";
import useReveal from "../useReveal.js";
import ArtCard from "./ArtCard.jsx";
import Lightbox from "./Lightbox.jsx";
import "./gallery.css";
import "./lightbox.css";

const CATEGORIES = ["All", "Sketch", "Painting", "Commission"];
const PAGE_SIZE = 9;

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState(null);
  const headingRef = useReveal();

  const filtered = useMemo(
    () =>
      filter === "All"
        ? artworks
        : artworks.filter((a) => a.category === filter),
    [filter]
  );

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filter]);

  const items = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  function openAt(art) {
    setOpenIndex(filtered.findIndex((a) => a.id === art.id));
  }

  function nav(dir) {
    setOpenIndex((i) => (i === null ? null : (i + dir + filtered.length) % filtered.length));
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
            {CATEGORIES.map((c) => {
              const count =
                c === "All"
                  ? artworks.length
                  : artworks.filter((a) => a.category === c).length;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  className={`filter-pill ${filter === c ? "active" : ""}`}
                  onClick={() => setFilter(c)}
                  data-cursor="hover"
                >
                  {c} <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="gallery-grid">
          {items.map((a, i) => (
            <ArtCard key={a.id} art={a} index={i} onOpen={openAt} />
          ))}
        </div>

        {hasMore && (
          <div className="gallery-more">
            <button
              className="btn btn-outline"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              data-cursor="hover"
            >
              <ChevronDown size={15} strokeWidth={1.75} />
              Show more ({filtered.length - visible} left)
            </button>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNav={nav}
        />
      )}
    </section>
  );
}
