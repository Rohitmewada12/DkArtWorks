import { useState } from "react";
import { Instagram, Mail, MessageCircle, Send, Youtube } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import useLang from "../LangContext.jsx";
import "./contact.css";

export default function Contact() {
  const { t } = useLang();
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Commission enquiry from ${form.name || "your website"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-inner">
        <div ref={ref} className="reveal contact-intro">
          <span className="section-chapter">{t("contact.chapter")}</span>
          <br />
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h2>{t("contact.heading")}</h2>
          <p className="section-lede">{t("contact.lede")}</p>

          <div className="contact-links">
            {site.whatsappNumber && (
              <a
                href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
                  site.whatsappMessage || ""
                )}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
              >
                <MessageCircle size={17} strokeWidth={1.75} />
                {t("contact.whatsapp")}
              </a>
            )}
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" data-cursor="hover">
              <Instagram size={17} strokeWidth={1.75} />
              @{site.instagramHandle}
            </a>
            <a href={site.youtubeUrl} target="_blank" rel="noreferrer" data-cursor="hover">
              <Youtube size={17} strokeWidth={1.75} />
              {t("contact.youtubeChannel")}
            </a>
            {site.contactEmail && (
              <a href={`mailto:${site.contactEmail}`} data-cursor="hover">
                <Mail size={17} strokeWidth={1.75} />
                {site.contactEmail}
              </a>
            )}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            {t("contact.formName")}
            <input
              type="text"
              required
              value={form.name}
              onChange={update("name")}
              placeholder={t("contact.namePlaceholder")}
            />
          </label>
          <label>
            {t("contact.formEmail")}
            <input
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder={t("contact.emailPlaceholder")}
            />
          </label>
          <label>
            {t("contact.formQuestion")}
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={update("message")}
              placeholder={t("contact.messagePlaceholder")}
            />
          </label>
          <button type="submit" className="btn btn-primary" data-cursor="hover">
            <Send size={15} strokeWidth={1.75} />
            {t("contact.send")}
          </button>
          <p className="contact-note">{t("contact.note")}</p>
        </form>
      </div>
    </section>
  );
}
