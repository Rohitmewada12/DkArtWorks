import { useState } from "react";
import { Instagram, Mail, Send, Youtube } from "lucide-react";
import site from "../data/site.js";
import useReveal from "../useReveal.js";
import "./contact.css";

export default function Contact() {
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
          <span className="eyebrow">Get in touch</span>
          <h2>Start a commission</h2>
          <p className="section-lede">
            The fastest way to reach me is Instagram — send a DM with your
            idea. Prefer email or a form? Either works too.
          </p>

          <div className="contact-links">
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">
              <Instagram size={17} strokeWidth={1.75} />
              @{site.instagramHandle}
            </a>
            <a href={site.youtubeUrl} target="_blank" rel="noreferrer">
              <Youtube size={17} strokeWidth={1.75} />
              YouTube channel
            </a>
            <a href={`mailto:${site.contactEmail}`}>
              <Mail size={17} strokeWidth={1.75} />
              {site.contactEmail}
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
            />
          </label>
          <label>
            What would you like made?
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={update("message")}
              placeholder="Portrait, pet, size, occasion — anything helps."
            />
          </label>
          <button type="submit" className="btn btn-primary">
            <Send size={15} strokeWidth={1.75} />
            Send enquiry
          </button>
          <p className="contact-note">
            Opens your email app with this filled in — nothing is sent from
            here directly.
          </p>
        </form>
      </div>
    </section>
  );
}
