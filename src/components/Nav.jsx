import { Instagram, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import site from "../data/site.js";
import useLang from "../LangContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import "./nav.css";

const LINKS = [
  { href: "#gallery", key: "nav.gallery" },
  { href: "#reels", key: "nav.reels" },
  { href: "#process", key: "nav.commissions" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#testimonials", key: "nav.reviews" },
  { href: "#about", key: "nav.about" },
  { href: "#faq", key: "nav.faq" },
  { href: "#contact", key: "nav.contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#gallery");
  const { t } = useLang();
  const { openBooking } = useBooking();

  useEffect(() => {
    const sectionIds = ["gallery", "reels", "process", "pricing", "testimonials", "about", "faq", "contact"];

    function handleScroll() {
      const scrollPos = window.scrollY + 160;
      let current = "#gallery";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            current = `#${id}`;
          }
        }
      }
      setActiveSection(current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)} data-cursor="hover">
          <span className="brand-dk">DK</span>
          <div className="nav-brand-text">
            <span className="brand-arts">DK Arts</span>
            <span className="nav-brand-subtitle">Artist &amp; Pencil Realist</span>
          </div>
        </a>

        <nav className="nav-links" aria-label="Main Navigation">
          {LINKS.map((l) => {
            const isActive = activeSection === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={isActive ? "active" : ""}
                data-cursor="hover"
              >
                {t(l.key)}
                {isActive && <span className="nav-active-pill" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        <div className="nav-controls">
          <a
            className="nav-ig"
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
          >
            <Instagram size={15} strokeWidth={1.8} />
            <span>@{site.instagramHandle}</span>
          </a>

          <button
            type="button"
            className="nav-book-btn"
            onClick={() => openBooking({ source: "Header Navigation" })}
            data-cursor="hover"
          >
            <Sparkles size={14} />
            <span>Book Artwork</span>
          </button>

          <button
            className="nav-toggle"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-cursor="hover"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile">
          <div className="nav-mobile-links">
            <button
              type="button"
              className="nav-mobile-book-btn"
              onClick={() => {
                setOpen(false);
                openBooking({ source: "Mobile Navigation Menu" });
              }}
            >
              <Sparkles size={16} />
              <span>Book Your Artwork</span>
            </button>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={activeSection === l.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {t(l.key)}
              </a>
            ))}
          </div>

          <div className="nav-mobile-footer">
            <a
              className="nav-mobile-ig"
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <Instagram size={17} strokeWidth={1.8} />
              <span>@{site.instagramHandle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
