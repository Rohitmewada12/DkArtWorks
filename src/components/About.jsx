import site from "../data/site.js";
import useReveal from "../useReveal.js";
import "./about.css";

const TOOLS = ["Graphite", "Charcoal", "Ink", "Watercolour", "Acrylic", "Coloured pencil"];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section about">
      <div className="wrap about-inner">
        <div className="about-portrait">
          <div className="about-frame">
            <img src="/gallery/artist.jpg" alt={site.fullName} />
          </div>
        </div>

        <div ref={ref} className="reveal about-copy">
          <span className="section-chapter">Scene 05</span>
          <br />
          <span className="eyebrow">About the artist</span>
          <h2>{site.fullName}</h2>

          {site.bio.map((p, i) => (
            <p key={i} className="about-p">
              {p}
            </p>
          ))}

          <div className="about-tools">
            {TOOLS.map((t) => (
              <span key={t} className="tool-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
