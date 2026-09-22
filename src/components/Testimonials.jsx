import { Quote, Star } from "lucide-react";
import testimonials from "../data/testimonials.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./testimonials.css";

export default function Testimonials() {
  const { t } = useLang();
  const headingRef = useReveal();
  const cardsRef = useReveal({ threshold: 0.1 });

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section testimonials">
      <div className="wrap">
        <div ref={headingRef} className="reveal section-head">
          <span className="section-chapter">{t("testimonials.chapter")}</span>
          <br />
          <span className="eyebrow">{t("testimonials.eyebrow")}</span>
          <h2>{t("testimonials.heading")}</h2>
          <p className="section-lede">{t("testimonials.lede")}</p>
        </div>

        <div ref={cardsRef} className="testimonial-grid stagger-group">
          {testimonials.map((t, i) => (
            <figure key={t.name + i} className="testimonial-card">
              <Quote className="testimonial-quote-mark" size={22} strokeWidth={1.5} aria-hidden="true" />
              <blockquote>{t.quote}</blockquote>
              {t.rating && (
                <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      strokeWidth={1.5}
                      className={s < t.rating ? "star-filled" : "star-empty"}
                    />
                  ))}
                </div>
              )}
              <figcaption>
                <span className="testimonial-name">{t.name}</span>
                {t.detail && <span className="testimonial-detail">{t.detail}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
