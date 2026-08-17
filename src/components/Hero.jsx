import { ArrowDown, Instagram, Youtube } from "lucide-react";
import site from "../data/site.js";
import SpinBadge from "./SpinBadge.jsx";
import "./hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="letterbox letterbox-top" aria-hidden="true" />
      <div className="letterbox letterbox-bottom" aria-hidden="true" />

      <div className="hero-bg" aria-hidden="true">
        <img src="/gallery/artist.jpg" alt="" />
        <div className="hero-scrim" />
        <div className="hero-vignette" />
      </div>

      <div className="wrap hero-inner">
        <span className="intro-eyebrow">A commissioned artist</span>

        <h1 className="hero-title">
          Drawn by hand,
          <br />
          made for you.
        </h1>

        <p className="hero-tagline">{site.tagline}</p>

        <div className="hero-actions">
          <a href="#gallery" className="btn btn-primary" data-cursor="hover">
            View the gallery
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            data-cursor="hover"
          >
            <Instagram size={16} strokeWidth={1.75} />
            Follow on Instagram
          </a>
        </div>

        <div className="hero-meta">
          <a href={site.instagramUrl} target="_blank" rel="noreferrer" data-cursor="hover">
            <Instagram size={14} strokeWidth={1.75} />@
            {site.instagramHandle}
          </a>
          <a href={site.youtubeUrl} target="_blank" rel="noreferrer" data-cursor="hover">
            <Youtube size={14} strokeWidth={1.75} />
            YouTube
          </a>
        </div>
      </div>

      <div className="hero-badge">
        <SpinBadge size={112} />
      </div>

      <a href="#gallery" className="hero-scroll" aria-label="Scroll to gallery" data-cursor="hover">
        <ArrowDown size={18} strokeWidth={1.5} />
      </a>
    </section>
  );
}
