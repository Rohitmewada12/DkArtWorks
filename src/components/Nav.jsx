import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import site from "../data/site.js";
import "./nav.css";

const LINKS = [
  { href: "#gallery", label: "Gallery" },
  { href: "#reels", label: "Reels" },
  { href: "#process", label: "Commissions" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
              {l.label}
            </a>
          ))}
        </nav>

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
          aria-label={open ? "Close menu" : "Open menu"}
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
              {l.label}
            </a>
          ))}
          <a href={site.instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} strokeWidth={1.75} /> @{site.instagramHandle}
          </a>
        </div>
      )}
    </header>
  );
}
