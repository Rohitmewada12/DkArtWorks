import { Instagram, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import site from "../data/site.js";
import useTheme from "../useTheme.js";
import useLang from "../LangContext.jsx";
import "./nav.css";

const LINKS = [
  { href: "#gallery", key: "nav.gallery" },
  { href: "#reels", key: "nav.reels" },
  { href: "#process", key: "nav.commissions" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#testimonials", key: "nav.reviews" },
  { href: "#about", key: "nav.about" },
  { href: "#contact", key: "nav.contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const { lang, t, toggle: toggleLang } = useLang();

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)} data-cursor="hover">
          <img src="/gallery/logo.jpg" width="30" height="30" alt="" className="nav-logo" />
          <span>{site.brandName}</span>
        </a>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-cursor="hover">
              {t(l.key)}
            </a>
          ))}
        </nav>

        <button
          className="nav-lang"
          onClick={toggleLang}
          aria-label={lang === "en" ? "हिन्दी में देखें" : "View in English"}
          data-cursor="hover"
        >
          {lang === "en" ? "हिं" : "EN"}
        </button>

        <button
          className="nav-theme"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? t("nav.themeToLight") : t("nav.themeToDark")}
          data-cursor="hover"
        >
          {theme === "dark" ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
        </button>

        <a
          className="nav-ig"
          href={site.instagramUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
        >
          <Instagram size={16} strokeWidth={1.75} />
          @{site.instagramHandle}
        </a>

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

      {open && (
        <div className="nav-mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {t(l.key)}
            </a>
          ))}
          <a href={site.instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} strokeWidth={1.75} /> @{site.instagramHandle}
          </a>
          <button className="nav-mobile-theme" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
            {theme === "dark" ? t("nav.lightPage") : t("nav.darkPage")}
          </button>
          <button className="nav-mobile-theme" onClick={toggleLang}>
            <span className="nav-lang-mark">{lang === "en" ? "हिं" : "EN"}</span>
            {lang === "en" ? "हिन्दी में देखें" : "View in English"}
          </button>
        </div>
      )}
    </header>
  );
}
