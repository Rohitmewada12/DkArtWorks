import { useState } from "react";
import { ExternalLink, Maximize2 } from "lucide-react";
import useReveal from "../useReveal.js";

export default function ArtCard({ art, index, onOpen, viewMode = "grid" }) {
  const ref = useReveal({ threshold: 0.05 });
  const [loaded, setLoaded] = useState(false);

  if (viewMode === "list") {
    // Eagerly fetch initial visible items to eliminate loading delay
    const isPriority = index < 6;

    return (
      <div
        ref={ref}
        className="art-list-item in-view"
        onClick={() => onOpen && onOpen(art)}
        role="button"
        tabIndex={0}
        data-cursor="hover"
        aria-label={`View ${art.title}`}
      >
        <div className={`art-list-media ${loaded ? "is-loaded" : ""}`}>
          <img
            src={art.thumb || art.image}
            alt={art.title}
            className={`art-list-img ${loaded ? "is-loaded" : ""}`}
            loading={isPriority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
        </div>

        <div className="art-list-content">
          <div className="art-list-header">
            <span className="art-list-category">{art.category}</span>
            <h3 className="art-list-title">{art.title}</h3>
          </div>
          <p className="art-list-medium">{art.medium}</p>
          {art.description && (
            <p className="art-list-desc">{art.description}</p>
          )}
        </div>

        <div className="art-list-controls">
          <button
            type="button"
            className="art-list-view-btn"
            aria-label={`Open ${art.title} in full screen`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen && onOpen(art);
            }}
          >
            <span>View Artwork</span>
            <ExternalLink size={15} strokeWidth={1.8} className="art-list-view-btn-icon" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <figure
      ref={ref}
      className="art-card stagger"
      style={{ "--stagger-delay": `${(index % 8) * 0.04}s` }}
    >
      <div
        className={`art-card-inner ${loaded ? "is-loaded" : ""}`}
        data-cursor="hover"
        onClick={() => onOpen && onOpen(art)}
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
        aria-label={`View ${art.title}`}
      >
        <img
          src={art.thumb || art.image}
          alt={art.title}
          loading="lazy"
          decoding="async"
          className="art-card-img"
          onLoad={() => setLoaded(true)}
        />

        <div className="art-card-scrim" aria-hidden="true" />

        <div className="art-card-info">
          <div className="art-card-meta">
            <h3 className="art-card-title">{art.title}</h3>
            <p className="art-card-medium">{art.medium}</p>
          </div>

          <span
            className="art-card-expand-icon"
            aria-hidden="true"
          >
            <Maximize2 size={16} strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </figure>
  );
}
