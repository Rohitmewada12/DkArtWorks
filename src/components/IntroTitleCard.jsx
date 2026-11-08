import { useEffect, useRef, useState } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import site from "../data/site.js";
import "./intro.css";

export default function IntroTitleCard() {
  const [active, setActive] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handleClose = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, 550);
  };

  useEffect(() => {
    // Check if user prefers reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(false);
      return;
    }

    // Lock body scroll while intro is active
    document.body.style.overflow = "hidden";

    // Default sound to ON: attempt unmuted playback
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch(() => {
            // If browser policy blocks unmuted autoplay without interaction,
            // fallback to muted and auto-unmute on first click/touch
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
      }
    }

    // Unmute on first user gesture if browser blocked unmuted autoplay
    const handleFirstGesture = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };
    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    // Allow user to dismiss with Escape
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !isMuted;
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

  if (!active) return null;

  return (
    <div
      className={`intro-video-overlay ${isExiting ? "is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Website Intro Video"
    >
      {/* Top Header Row with DK Arts Branding and Skip Button */}
      <div className="intro-top-bar">
        <div className="intro-brand">
          <span className="intro-brand-dk">DK</span>
          <div className="intro-brand-info">
            <span className="intro-brand-name">{site.brandName}</span>
            <span className="intro-brand-sub">Studio Realism & Art</span>
          </div>
        </div>

        <button
          type="button"
          className="intro-skip-btn"
          onClick={handleClose}
          aria-label="Skip intro video"
          data-cursor="hover"
        >
          <span>Skip Intro</span>
          <ArrowRight size={14} strokeWidth={2} className="intro-skip-arrow" />
        </button>
      </div>

      {/* Main Cinematic Video Stage */}
      <div className="intro-stage-container">
        {/* Ambient Backlight Glow */}
        <div className="intro-ambient-glow" aria-hidden="true" />

        {/* Video Card Frame */}
        <div className="intro-video-frame">
          <video
            ref={videoRef}
            src="/videos/reel-3.mp4"
            className="intro-video-element"
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleClose}
            onError={handleClose}
          />

          {/* Sound Toggle Button */}
          <button
            type="button"
            className="intro-sound-btn"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute audio" : "Mute audio"}
            data-cursor="hover"
          >
            {isMuted ? (
              <>
                <VolumeX size={15} strokeWidth={2} />
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 size={15} strokeWidth={2} />
                <span>Sound On</span>
              </>
            )}
          </button>

          {/* Progress Bar Line */}
          <div className="intro-progress-track" aria-hidden="true">
            <div
              className="intro-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="intro-bottom-hint" aria-hidden="true">
        <span>Press <kbd>Esc</kbd> or click Skip to enter</span>
      </div>
    </div>
  );
}
