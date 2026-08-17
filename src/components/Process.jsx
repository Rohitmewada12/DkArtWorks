import { Instagram } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import "./process.css";

export default function Process() {
  const headingRef = useReveal();

  return (
    <section id="process" className="section process">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head">
          <span className="eyebrow">Commissions</span>
          <h2>How a commission comes together</h2>
          <p className="section-lede">
            Four steps, start to finish. You approve the sketch before any
            final work begins, so the piece stays true to what you had in
            mind.
          </p>
        </div>

        <ol className="process-steps">
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

        <div className="commission-types">
          {site.commissionTypes.map((c) => (
            <div key={c.title} className="commission-card">
              <h4>{c.title}</h4>
              <p className="commission-medium">{c.medium}</p>
              <p className="commission-turnaround">
                Turnaround: {c.turnaround}
              </p>
            </div>
          ))}
        </div>

        <div className="process-cta">
          <p>Have an idea already? Start with a DM — reference photos help.</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sienna"
          >
            <Instagram size={16} strokeWidth={1.75} />
            Message on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
