import { ArrowDown, Instagram, Youtube } from "lucide-react";
import site from "../data/site.js";
import SpinBadge from "./SpinBadge.jsx";
import useLang from "../LangContext.jsx";
import "./hero.css";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="hero">
      <div className="wrap hero-spread">
        <div className="hero-page hero-page-left">
          <span className="intro-eyebrow">{t("hero.eyebrow")}</span>

          <h1 className="hero-title">
            {t("hero.titleLine1")}
            <br />
            <span className="accent">{t("hero.titleAccent")}</span>
          </h1>

          <p className="hero-tagline">{site.tagline}</p>

          <div className="hero-actions">
            <a href="#gallery" className="btn btn-primary" data-cursor="hover">
              {t("hero.viewGallery")}
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              data-cursor="hover"
            >
              <Instagram size={16} strokeWidth={1.75} />
              {t("hero.followInstagram")}
            </a>
          </div>

          <div className="hero-meta">
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" data-cursor="hover">
              <Instagram size={14} strokeWidth={1.75} />@
              {site.instagramHandle}
            </a>
            <a href={site.youtubeUrl} target="_blank" rel="noreferrer" data-cursor="hover">
              <Youtube size={14} strokeWidth={1.75} />
              {t("hero.youtube")}
            </a>
          </div>

          <a href="#gallery" className="hero-scroll" data-cursor="hover">
            <ArrowDown size={15} strokeWidth={1.5} />
            {t("hero.scroll")}
          </a>
        </div>

        <div className="hero-page hero-page-right">
          <div className="hero-frame">
            <img src="/gallery/artist.jpg" alt="Portrait of the artist at work" />
            <div className="hero-frame-corner" aria-hidden="true" />
          </div>
          <div className="hero-badge">
            <SpinBadge size={104} />
          </div>
        </div>
      </div>

      <div className="hero-spine" aria-hidden="true" />
    </section>
  );
}
