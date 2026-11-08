import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Image, Pencil, User } from "lucide-react";
import artworks from "../data/artworks.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import ArtCard from "./ArtCard.jsx";
import Lightbox from "./Lightbox.jsx";
import "./gallery.css";
import "./lightbox.css";

const CATEGORIES = [
  { key: "Sketch", label: "Sketch", icon: Pencil },
  { key: "Painting", label: "Painting", icon: Image },
  { key: "Commission", label: "Commission", icon: User },
];

const SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "titleAsc", label: "Title A–Z" },
  { key: "titleDesc", label: "Title Z–A" },
];

const PAGE_SIZE = 12;
const DEFAULT_FILTER = "Sketch";

export default function Gallery() {
  const { t } = useLang();
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [sortKey, setSortKey] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState(null);

  const headingRef = useReveal();
  const sortRef = useRef(null);

  // Close sorting dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter and sort items
  const filteredAndSorted = useMemo(() => {
    let list = artworks.filter((a) => a.category === filter);

    switch (sortKey) {
      case "newest":
        list.sort((a, b) => (a.order || a.id) - (b.order || b.id));
        break;
      case "oldest":
        list.sort((a, b) => (b.order || b.id) - (a.order || a.id));
        break;
      case "titleAsc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return list;
  }, [filter, sortKey]);

  // Reset pagination count on filter or sort change
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filter, sortKey]);

  const items = filteredAndSorted.slice(0, visible);
  const hasMore = visible < filteredAndSorted.length;

  function openAt(art) {
    const idx = filteredAndSorted.findIndex((a) => a.id === art.id);
    setOpenIndex(idx !== -1 ? idx : 0);
  }

  function nav(dir) {
    setOpenIndex((i) =>
      i === null
        ? null
        : (i + dir + filteredAndSorted.length) % filteredAndSorted.length
    );
  }

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.key === sortKey)?.label || "Newest";

  return (
    <section id="gallery" className="section gallery" aria-label="Artwork Gallery">
      {/* Background Decorative Sketch: Exact Eye from Reference Photo */}
      <div className="gallery-bg-decor" aria-hidden="true">
        <div className="gallery-bg-eye-wrap">
          <img
            src="/gallery/eye-sketch-exact.png"
            alt=""
            className="gallery-bg-eye"
          />
        </div>
        <div className="gallery-bg-brush-corner" />
      </div>

      {/* Left Vertical Editorial Label */}
      <div className="gallery-vertical-label" aria-hidden="true">
        <span className="g-v-rule" />
        <span className="g-v-text">DK ARTS GALLERY</span>
        <span className="g-v-rule" />
      </div>

      <div className="wrap gallery-wrap">
        {/* Gallery Introduction */}
        <div ref={headingRef} className="reveal gallery-intro">
          <span className="gallery-eyebrow">ARTWORK GALLERY</span>

          <div className="gallery-title-row">
            <h2 className="gallery-main-title">
              The Gallery
              {/* Burnt-Orange Brushstroke Underline extending to right */}
              <svg
                className="gallery-title-stroke"
                viewBox="0 0 280 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 11C45 4 125 3 276 9C205 16 95 17 18 14"
                  stroke="#C94A29"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h2>
          </div>

          <p className="gallery-lede">
            Studies, finished paintings and commissioned portraits — tap any
            piece for a full-screen view.
          </p>
        </div>

        {/* Category Filters and Controls Toolbar Row */}
        <div className="gallery-action-bar">
          {/* Category Filters (Left) */}
          <div className="gallery-category-pills" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const count = artworks.filter((a) => a.category === cat.key).length;
              const isActive = filter === cat.key;

              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={isActive}
                  className={`gallery-filter-pill ${isActive ? "is-active" : ""}`}
                  onClick={() => setFilter(cat.key)}
                  data-cursor="hover"
                >
                  {IconComp && (
                    <IconComp size={14} strokeWidth={2} className="filter-pill-icon" />
                  )}
                  <span className="filter-pill-name">{cat.label}</span>
                  <span className="filter-pill-count">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown (Right) */}
          <div className="gallery-toolbar">
            {/* Sorting Dropdown */}
            <div className="gallery-sort-dropdown" ref={sortRef}>
              <button
                type="button"
                className="sort-trigger"
                onClick={() => setSortOpen((v) => !v)}
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
                data-cursor="hover"
              >
                <span>Sort: {currentSortLabel}</span>
                <ChevronDown size={14} strokeWidth={2} className={`sort-chevron ${sortOpen ? "open" : ""}`} />
              </button>

              {sortOpen && (
                <div className="sort-menu" role="listbox">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      role="option"
                      aria-selected={sortKey === opt.key}
                      className={`sort-option ${sortKey === opt.key ? "selected" : ""}`}
                      onClick={() => {
                        setSortKey(opt.key);
                        setSortOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Artwork Exhibition Layout (List View) */}
        <div className="gallery-list-view">
          {items.map((art, i) => (
            <ArtCard
              key={art.id}
              art={art}
              index={i}
              onOpen={openAt}
              viewMode="list"
            />
          ))}
        </div>

        {/* Show More Pagination */}
        {hasMore && (
          <div className="gallery-more-wrap">
            <button
              className="gallery-more-btn"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              data-cursor="hover"
            >
              <span>{t("gallery.showMore")}</span>
              <span className="gallery-more-counter">
                ({filteredAndSorted.length - visible} {t("gallery.left")})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Full-Screen Exhibition Lightbox */}
      {openIndex !== null && (
        <Lightbox
          items={filteredAndSorted}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNav={nav}
        />
      )}
    </section>
  );
}
