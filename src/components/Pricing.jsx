import { Instagram } from "lucide-react";
import { pricingTiers, addOns, alsoAvailable } from "../data/pricing.js";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./pricing.css";

export default function Pricing() {
  const { t } = useLang();
  const headingRef = useReveal();
  const tiersRef = useReveal({ threshold: 0.1 });
  const extraRef = useReveal({ threshold: 0.1 });

  return (
    <section id="pricing" className="section pricing">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head">
          <span className="section-chapter">{t("pricing.chapter")}</span>
          <br />
          <span className="eyebrow">{t("pricing.eyebrow")}</span>
          <h2>{t("pricing.heading")}</h2>
          <p className="section-lede">{t("pricing.lede")}</p>
        </div>

        <div ref={tiersRef} className="pricing-tiers stagger-group">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              className={`price-card ${tier.featured ? "price-card-featured" : ""}`}
            >
              {tier.featured && <span className="price-badge">{t("pricing.mostRequested")}</span>}
              <h3>{tier.title}</h3>
              <p className="price-card-desc">{tier.description}</p>
              <ul className="price-rows">
                {tier.sizes.map((s) => (
                  <li key={s.label} className="price-row">
                    <span className="price-row-label">{s.label}</span>
                    <span className="price-row-leader" aria-hidden="true" />
                    <span className="price-row-value">{s.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={extraRef} className="pricing-extra reveal">
          <div className="addons">
            <h4>{t("pricing.addons")}</h4>
            <ul className="addons-list">
              {addOns.map((a) => (
                <li key={a.label}>
                  <span>{a.label}</span>
                  <span className="addons-price">{a.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="also-available">
            <h4>{t("pricing.alsoAvailable")}</h4>
            <div className="also-grid">
              {alsoAvailable.map((item) => (
                <div key={item.title} className="also-item">
                  <span className="also-item-title">{item.title}</span>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pricing-cta">
          <p>{t("pricing.ctaText")}</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sienna"
            data-cursor="hover"
          >
            <Instagram size={16} strokeWidth={1.75} />
            {t("pricing.ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
