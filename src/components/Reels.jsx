import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Clapperboard, Instagram, Play, X } from "lucide-react";
import videos from "../data/videos.js";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import "./reels.css";

const PLACEHOLDER_COUNT = 3;

export default function Reels() {
  const [openVideo, setOpenVideo] = useState(null);
  const headingRef = useReveal();
  const hasVideos = videos.length > 0;

  return (
    <section id="reels" className="section reels">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head">
          <span className="section-chapter">Scene 02</span>
          <br />
          <span className="eyebrow">In motion</span>
          <h2>Process reels</h2>
          <p className="section-lede">
            Short clips of pieces coming together — pencil, brush and paper.
          </p>
        </div>

        <div className="reels-row">
          {hasVideos
            ? videos.map((v, i) => (
                <ReelCard key={i} video={v} onPlay={() => setOpenVideo(v)} />
              ))
            : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                <ReelPlaceholder key={i} />
              ))}
        </div>
      </div>

      {openVideo && (
        <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
      )}
    </section>
  );
}

function ReelCard({ video, onPlay }) {
  return (
    <button className="reel-card" onClick={onPlay} data-cursor="hover">
      <img src={video.poster} alt={video.title || ""} loading="lazy" />
      <span className="reel-scrim" aria-hidden="true" />
      <span className="reel-play" aria-hidden="true">
        <Play size={20} strokeWidth={1.5} fill="currentColor" />
      </span>
      {video.title && <span className="reel-title">{video.title}</span>}
    </button>
  );
}

function ReelPlaceholder() {
  return (
    <a
      className="reel-card reel-placeholder"
      href={site.instagramUrl}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
    >
      <Clapperboard size={26} strokeWidth={1.3} />
      <span className="reel-placeholder-text">
        New reel
        <br />
        coming soon
      </span>
      <span className="reel-placeholder-cta">
        <Instagram size={13} strokeWidth={1.75} />@{site.instagramHandle}
      </span>
    </a>
  );
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="video-modal" onClick={onClose} role="dialog" aria-modal="true">
      <button className="video-modal-close" onClick={onClose} aria-label="Close">
        <X size={22} strokeWidth={1.75} />
      </button>

      <div className="video-modal-stage" onClick={(e) => e.stopPropagation()}>
        {video.type === "youtube" ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={video.src} controls autoPlay playsInline />
        )}
      </div>
    </div>,
    document.body
  );
}
