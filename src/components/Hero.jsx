import { ArrowDown, Instagram, Youtube } from "lucide-react";
import site from "../data/site.js";
import "./hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Sketch · Paint · Commission</span>

          <h1 className="hero-title">
            Drawn by hand,
            <br />
            made for you.
            <svg
              className="hero-underline"
              viewBox="0 0 320 24"
              width="230"
              aria-hidden="true"
            >
              <path
                d="M4 16 C 70 4, 140 22, 200 10 S 290 4, 316 12"
                fill="none"
                stroke="var(--sienna)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 420,
                  strokeDashoffset: 0,
                }}
              />
            </svg>
          </h1>

          <p className="hero-tagline">{site.tagline}</p>

          <div className="hero-actions">
            <a href="#gallery" className="btn btn-primary">
              View the gallery
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <Instagram size={16} strokeWidth={1.75} />
              Follow on Instagram
            </a>
          </div>

          <div className="hero-meta">
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">
              <Instagram size={14} strokeWidth={1.75} />@
              {site.instagramHandle}
            </a>
            <a href={site.youtubeUrl} target="_blank" rel="noreferrer">
              <Youtube size={14} strokeWidth={1.75} />
              YouTube
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card">
            <svg
              className="hero-doodle"
              viewBox="0 0 360 360"
              width="100%"
              height="100%"
            >
              {/* Monogram strokes */}
              <path
                d="M90 260 L90 100 L140 100 C 180 100 200 130 200 160 C 200 195 175 220 135 220 L100 220"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ "--len": 520, "--delay": "0.1s" }}
              />
              <path
                d="M225 100 L225 260 M225 185 L285 100 M225 185 L290 260"
                fill="none"
                stroke="var(--prussian)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ "--len": 420, "--delay": "0.5s" }}
              />
              {/* Underline flourish */}
              <path
                d="M70 292 C 140 305 240 305 300 288"
                fill="none"
                stroke="var(--sienna)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{ "--len": 260, "--delay": "0.95s" }}
              />
              {/* Corner doodles */}
              <path
                d="M50 60 C 58 40 78 40 80 58 C 82 74 62 78 58 64"
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ "--len": 140, "--delay": "1.15s" }}
              />
              <path
                d="M300 50 L316 66 M316 50 L300 66"
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ "--len": 60, "--delay": "1.3s" }}
              />
              <path
                d="M300 300 L300 330 M286 315 L314 315"
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ "--len": 70, "--delay": "1.4s" }}
              />
            </svg>
          </div>
          <span className="hero-card-caption">sketchbook, no. 04</span>
        </div>
      </div>

      <a href="#gallery" className="hero-scroll" aria-label="Scroll to gallery">
        <ArrowDown size={18} strokeWidth={1.5} />
      </a>

      <div className="deckle" aria-hidden="true">
        <svg preserveAspectRatio="none" viewBox="0 0 400 22">
          <path
            d="M0 0 L0 12 C 10 20 20 4 30 12 C 40 20 50 4 60 12 C 70 20 80 4 90 12 C 100 20 110 4 120 12 C 130 20 140 4 150 12 C 160 20 170 4 180 12 C 190 20 200 4 210 12 C 220 20 230 4 240 12 C 250 20 260 4 270 12 C 280 20 290 4 300 12 C 310 20 320 4 330 12 C 340 20 350 4 360 12 C 370 20 380 4 390 12 C 395 16 400 8 400 12 L400 0 Z"
            fill="var(--paper-soft)"
          />
        </svg>
      </div>
    </section>
  );
}
