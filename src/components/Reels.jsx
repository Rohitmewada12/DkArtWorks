import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Film,
  Instagram,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import videos from "../data/videos.js";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import "./reels.css";

export default function Reels() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useReveal();
  const scrollRef = useRef(null);
  const { openBooking } = useBooking();

  // Track active slide based on horizontal scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".reel-card-wrap");
    if (!card) return;
    const cardWidth = card.offsetWidth + 20; // width + gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(2, index)));
  };

  const scrollToIndex = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".reel-card-wrap");
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setActiveIndex(idx);
  };

  const scrollPrev = () => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  };

  const scrollNext = () => {
    scrollToIndex(Math.min(2, activeIndex + 1));
  };

  const openVideo = openIndex !== null ? videos[openIndex] : null;

  return (
    <section id="reels" className="section reels-section" aria-label="Process Reels">
      {/* ============================================================
          DARK HANDMADE PAPER TEXTURE & ARTISTIC DECORATIVE LAYERS
          ============================================================ */}
      <div className="reels-bg-decorations" aria-hidden="true">
        {/* Fine Charcoal Paper Noise Texture Overlay */}
        <div className="reels-texture-noise" />

        {/* Soft Ambient Vignette */}
        <div className="reels-texture-vignette" />

        {/* Top-Right Faint Pencil Sketch of Eye on Dark Charcoal */}
        <div className="reels-bg-eye-wrap">
          <img
            src="/gallery/eye-sketch-hero-dark.png"
            alt=""
            className="reels-bg-eye-img"
          />
        </div>

        {/* Top-Left Hand-Painted Orange Dry-Brush Stroke */}
        <div className="reels-brush-topleft">
          <svg
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="reels-brush-svg"
            preserveAspectRatio="none"
          >
            <path
              d="M-20 -10C25 15 90 45 190 75C140 82 70 60 -10 32"
              fill="#F05A16"
              opacity="0.95"
            />
            <path
              d="M-30 18C45 42 120 72 230 115C170 120 85 95 -15 50"
              fill="#F05A16"
              opacity="0.88"
            />
            <path
              d="M-20 45C30 65 95 98 175 142C125 145 60 120 -10 75"
              fill="#F05A16"
              opacity="0.65"
            />
            <path
              d="M-10 72C20 85 65 110 135 152C90 152 45 135 0 102"
              fill="#F05A16"
              opacity="0.45"
            />
          </svg>
        </div>

        {/* Bottom-Right Hand-Painted Orange Dry-Brush Stroke */}
        <div className="reels-brush-bottomright">
          <svg
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="reels-brush-svg"
            preserveAspectRatio="none"
          >
            <path
              d="M340 210C270 180 170 130 50 80C110 75 210 115 330 170"
              fill="#F05A16"
              opacity="0.95"
            />
            <path
              d="M350 175C260 140 140 90 10 35C80 30 190 75 320 135"
              fill="#F05A16"
              opacity="0.88"
            />
            <path
              d="M330 140C240 105 130 60 20 5C90 10 190 45 300 105"
              fill="#F05A16"
              opacity="0.65"
            />
            <path
              d="M340 105C260 80 180 50 80 15C140 22 220 50 310 85"
              fill="#F05A16"
              opacity="0.45"
            />
          </svg>
        </div>
      </div>

      <div className="wrap reels-container">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div ref={headingRef} className="reveal reels-header-row">
          <div className="reels-header-left">
            {/* Small Orange Handwritten Label */}
            <div className="reels-plate-row">
              <span className="reels-plate-text">Plate 02</span>
              <span className="reels-plate-dash">—</span>
              <span className="reels-plate-sub">IN MOTION</span>
            </div>

            {/* Main Heading with Orange Brushstroke Underline */}
            <div className="reels-title-box">
              <h2 className="reels-title">Process Reels</h2>
              <svg
                className="reels-title-underline"
                viewBox="0 0 280 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 11C55 4 150 3 276 9C195 15 95 16 16 13"
                  stroke="#F05A16"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Warm Beige Sans-Serif Description */}
            <p className="reels-lede">
              Short clips of pieces coming together — pencil, brush and paper.
            </p>
          </div>

          {/* Upper-Right Circular Navigation Buttons */}
          <div className="reels-header-nav" aria-label="Reels carousel navigation">
            <button
              type="button"
              className="reels-nav-btn reels-nav-prev"
              onClick={scrollPrev}
              aria-label="Previous reels"
              data-cursor="hover"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="reels-nav-btn reels-nav-next"
              onClick={scrollNext}
              aria-label="Next reels"
              data-cursor="hover"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ============================================================
            FOUR VISUALLY BALANCED VIDEO CARDS ROW (DESKTOP)
            ============================================================ */}
        <div
          className="reels-cards-track"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {/* Card 1: Sukuna Anime Drawing */}
          {videos[0] && (
            <ReelVideoCard
              video={videos[0]}
              counter="01 / 03"
              onPlay={() => setOpenIndex(0)}
            />
          )}

          {/* Card 2: Panchmukhi Hanuman */}
          {videos[1] && (
            <ReelVideoCard
              video={videos[1]}
              counter="02 / 03"
              onPlay={() => setOpenIndex(1)}
            />
          )}

          {/* Card 3: Radha Krishna Time-lapse */}
          {videos[2] && (
            <ReelVideoCard
              video={videos[2]}
              counter="03 / 03"
              onPlay={() => setOpenIndex(2)}
            />
          )}

          {/* Card 4: Instagram Promotional Card Matching Exact Design */}
          <InstagramPromoCard />
        </div>

        {/* ============================================================
            PAGINATION INDICATOR (NO SCROLLBAR)
            ============================================================ */}
        <div className="reels-pagination-wrap" aria-label="Carousel pagination">
          <div className="reels-pagination-line" aria-hidden="true" />
          <div className="reels-pagination-dots">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                className={`reels-dot-pill ${activeIndex === idx ? "active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="reels-pagination-line" aria-hidden="true" />
        </div>
      </div>

      {/* Fullscreen Reel Viewer Modal */}
      {openVideo && (
        <ReelPlayerModal
          video={openVideo}
          currentIndex={openIndex}
          totalCount={videos.length}
          hasPrev={openIndex > 0}
          hasNext={openIndex < videos.length - 1}
          onPrev={() => setOpenIndex((prev) => Math.max(0, prev - 1))}
          onNext={() => setOpenIndex((prev) => Math.min(videos.length - 1, prev + 1))}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}

// ============================================================
// REEL VIDEO CARD COMPONENT
// ============================================================
function ReelVideoCard({ video, counter, onPlay }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (video.type === "file" && videoRef.current) {
      videoRef.current
        .play()
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (video.type === "file" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="reel-card-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`reel-card ${isHovered ? "is-hovered" : ""}`}
        onClick={onPlay}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPlay();
          }
        }}
        data-cursor="hover"
        aria-label={`Play reel: ${video.title}`}
      >
        {/* Artwork Image Layer */}
        <img
          src={video.poster}
          alt={video.title}
          loading="eager"
          className="reel-card-img"
        />

        {/* Hover Silent Motion Preview */}
        {video.type === "file" && (
          <video
            ref={videoRef}
            src={video.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="reel-hover-video"
            aria-hidden="true"
          />
        )}

        {/* Bottom Dark Gradient Scrim */}
        <div className="reel-card-scrim" aria-hidden="true" />

        {/* Top Header Bar */}
        <div className="reel-card-topbar">
          <div className="reel-badge-pill" aria-hidden="true">
            <Film size={12} strokeWidth={2.5} className="reel-badge-icon" />
            <span className="reel-badge-text">REEL</span>
          </div>

          <div className="reel-card-counter" aria-hidden="true">
            {counter}
          </div>
        </div>

        {/* Center Prominent Circular Orange Play Button */}
        <div className="reel-play-knob" aria-hidden="true">
          <Play size={18} fill="#ffffff" color="#ffffff" strokeWidth={0} />
        </div>

        {/* Bottom Card Information */}
        <div className="reel-card-bottom">
          <h3 className="reel-card-title">{video.title}</h3>
          <p className="reel-card-medium">{video.medium}</p>
          <div className="reel-card-action">
            <span>Watch Full Reel</span>
            <span className="reel-action-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INSTAGRAM PROMOTIONAL CARD COMPONENT (EXACT MATCH)
// ============================================================
function InstagramPromoCard() {
  return (
    <div className="reel-card-wrap reel-ig-wrap">
      <div className="reel-card reel-ig-card">
        {/* Subtle Torn Craft Paper Detail at Lower-Right of Card */}
        <div className="reel-ig-torn-paper" aria-hidden="true" />

        <div className="reel-ig-content">
          {/* Outlined Instagram Icon */}
          <div className="reel-ig-icon-circle" aria-hidden="true">
            <Instagram size={34} strokeWidth={1.8} className="reel-ig-camera" />
          </div>

          {/* Uppercase Studio Label */}
          <span className="reel-ig-eyebrow">FOLLOW THE STUDIO</span>

          {/* Ivory Serif Heading */}
          <h3 className="reel-ig-heading">More on Instagram</h3>

          {/* Warm Beige Description */}
          <p className="reel-ig-desc">
            Time-lapses, artwork progress, and behind-the-scenes moments.
          </p>

          {/* Instagram Handle Capsule Pill */}
          <div className="reel-ig-handle-pill">
            <span>@{site.instagramHandle}</span>
          </div>

          {/* Orange Hand-Painted Brushstroke Button */}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="reel-ig-action-btn"
            data-cursor="hover"
            aria-label="Follow DK Arts on Instagram"
          >
            <span>Follow on Instagram</span>
            <span className="reel-ig-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CINEMATIC REEL VIEWER MODAL
// ============================================================
function ReelPlayerModal({
  video,
  currentIndex,
  totalCount,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onClose,
}) {
  const { openBooking } = useBooking();
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrev) onPrev();
      else if (e.key === "ArrowRight" && hasNext) onNext();
      else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, hasPrev, hasNext, onPrev, onNext]);

  useEffect(() => {
    setIsPaused(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsMuted(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [video.src]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  return createPortal(
    <div
      className="video-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Reel player"
    >
      <div className="video-modal-top-bar" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-info">
          <span className="video-modal-counter">
            {currentIndex + 1} / {totalCount}
          </span>
          <span className="video-modal-author">@{site.instagramHandle}</span>
        </div>
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close reel player"
          data-cursor="hover"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      {hasPrev && (
        <button
          type="button"
          className="video-modal-side-nav video-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous reel"
          data-cursor="hover"
        >
          <ChevronLeft size={24} strokeWidth={2.2} />
        </button>
      )}

      <div className="video-modal-stage" onClick={(e) => e.stopPropagation()}>
        <div className="video-timeline-bar" aria-hidden="true">
          <div className="video-timeline-progress" style={{ width: `${progress}%` }} />
        </div>

        <div className="video-player-container" onClick={togglePlay}>
          {video.type === "youtube" ? (
            <div className="video-embed">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
                title={video.title || "DK Arts process video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              className="video-player"
              src={video.src}
              playsInline
              autoPlay
              loop
              onTimeUpdate={handleTimeUpdate}
              poster={video.poster}
            />
          )}

          {isPaused && (
            <div className="video-paused-indicator" aria-hidden="true">
              <Pause size={36} strokeWidth={2} />
            </div>
          )}

          {video.type === "file" && (
            <button
              type="button"
              className="video-sound-btn"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              data-cursor="hover"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}
        </div>

        <div className="video-modal-bottom">
          <div className="video-modal-title-group">
            {video.title && <h3 className="video-modal-title">{video.title}</h3>}
            {video.medium && <p className="video-modal-medium">{video.medium}</p>}
          </div>

          <div className="video-modal-actions-group">
            <button
              type="button"
              className="video-modal-book-btn"
              onClick={() => {
                onClose();
                openBooking({
                  sourceTitle: video.title,
                  sourceType: "Process Reel",
                  artworkType: video.title?.toLowerCase().includes("painting") ? "Custom Painting" : "Portrait",
                  subject: video.title,
                  medium: video.medium,
                  artworkImage: video.poster,
                  source: `Reel — ${video.title}`,
                });
              }}
              data-cursor="hover"
            >
              <Sparkles size={15} />
              <span>Create Something Like This</span>
            </button>

            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="video-modal-ig-btn"
              data-cursor="hover"
            >
              <Instagram size={15} strokeWidth={2} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {hasNext && (
        <button
          type="button"
          className="video-modal-side-nav video-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next reel"
          data-cursor="hover"
        >
          <ChevronRight size={24} strokeWidth={2.2} />
        </button>
      )}
    </div>,
    document.body
  );
}
