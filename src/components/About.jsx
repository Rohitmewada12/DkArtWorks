import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./about.css";

const TOOLS = ["Graphite", "Charcoal", "Ink", "Watercolour", "Acrylic", "Coloured pencil"];

export default function About() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section id="about" className="section about">
      <div className="wrap about-inner">
        <div className="about-portrait-col">
          <div className="about-paper-stack">
            <div className="about-paper-under" aria-hidden="true" />
            <div className="about-frame">
              <img src="/gallery/artist.jpg" alt={site.fullName} className="about-img" />
              <div className="about-photo-tag">DK ARTS STUDIO</div>
            </div>
            <div className="about-stamp" aria-hidden="true">
              <span>REALIST</span>
            </div>
          </div>
        </div>

        <div ref={ref} className="reveal about-copy">
          <span className="section-chapter">{t("about.chapter")}</span>
          <br />
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 className="about-artist-name">{site.fullName}</h2>

          <div className="about-bio-text">
            {site.bio.map((p, i) => (
              <p key={i} className="about-p">
                {p}
              </p>
            ))}
          </div>

          <div className="about-philosophy">
            <blockquote className="about-quote">
              "Every stroke of the pencil carries intention. A great portrait is not just about capturing facial features, but bottling the soul and memory of that person forever."
            </blockquote>
          </div>

          <div className="about-tools-wrap">
            <span className="about-tools-title">Tools &amp; Mediums:</span>
            <div className="about-tools">
              {TOOLS.map((t) => (
                <span key={t} className="tool-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="about-signature-wrap">
            <span className="about-signature-hand">{site.fullName}</span>
            <span className="about-signature-title">Artist &amp; Realist, DK Arts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
