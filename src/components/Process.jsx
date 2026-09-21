import { Instagram } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./process.css";

export default function Process() {
  const { t } = useLang();
  const headingRef = useReveal();
  const stepsRef = useReveal({ threshold: 0.1 });
  const cardsRef = useReveal({ threshold: 0.1 });

  return (
    <section id="process" className="section process">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head">
          <span className="section-chapter">{t("process.chapter")}</span>
          <br />
          <span className="eyebrow">{t("process.eyebrow")}</span>
          <h2>{t("process.heading")}</h2>
          <p className="section-lede">{t("process.lede")}</p>
        </div>

        <ol ref={stepsRef} className="process-steps stagger-group">
          {site.process.map((step, i) => (
            <li key={step.title} className="process-step">
              <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div ref={cardsRef} className="commission-types stagger-group">
          {site.commissionTypes.map((c) => (
            <div key={c.title} className="commission-card">
              <h4>{c.title}</h4>
              <p className="commission-medium">{c.medium}</p>
              <p className="commission-turnaround">
                {t("process.turnaround")}: {c.turnaround}
              </p>
            </div>
          ))}
        </div>

        <div className="process-cta">
          <p>{t("process.ctaText")}</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sienna"
            data-cursor="hover"
          >
            <Instagram size={16} strokeWidth={1.75} />
            {t("process.ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
