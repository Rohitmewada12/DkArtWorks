import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import artworks from "../data/artworks.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import ArtCard from "./ArtCard.jsx";
import Lightbox from "./Lightbox.jsx";
import "./gallery.css";
import "./lightbox.css";

const CATEGORIES = ["All", "Sketch", "Painting", "Commission"];
const PAGE_SIZE = 9;
// Grid runs 4-wide on desktop — if a page would leave a near-empty
// dangling row (an amount less than one row), just show it instead
// of making the person click "Show more" for one or two pieces.
const ROW_WIDTH = 4;

function nextCount(count, total) {
  const next = count + PAGE_SIZE;
  return total - next <= ROW_WIDTH ? total : next;
}

export default function Gallery() {
  const { t } = useLang();
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
    setVisible(nextCount(0, filtered.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <span className="section-chapter">{t("gallery.chapter")}</span>
            <br />
            <span className="eyebrow">{t("gallery.eyebrow")}</span>
            <h2>{t("gallery.heading")}</h2>
            <p className="section-lede">{t("gallery.lede")}</p>
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
                  {t(`gallery.filter.${c}`)} <span className="filter-count">{count}</span>
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
              onClick={() => setVisible((v) => nextCount(v, filtered.length))}
              data-cursor="hover"
            >
              <ChevronDown size={15} strokeWidth={1.75} />
              {t("gallery.showMore")} ({filtered.length - visible} {t("gallery.left")})
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
