import { Instagram, Youtube } from "lucide-react";
import site from "../data/site.js";
import useLang from "../LangContext.jsx";
import "./footer.css";

const FOOTER_LINKS = [
  { href: "#top", key: "nav.home" },
  { href: "#gallery", key: "nav.gallery" },
  { href: "#reels", key: "nav.reels" },
  { href: "#process", key: "nav.commissions" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#testimonials", key: "nav.reviews" },
  { href: "#about", key: "nav.about" },
  { href: "#contact", key: "nav.contact" },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="wrap footer-content">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <span className="brand-dk">DK</span>
              <span className="brand-arts">Arts</span>
            </div>
            <p className="footer-brand-sub">Artist &amp; Pencil Realist Studio</p>
            <p className="footer-tagline">{site.tagline}</p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Navigation</span>
            <div className="footer-links-grid">
              {FOOTER_LINKS.map((l) => (
                <a key={l.href} href={l.href} data-cursor="hover">
                  {t(l.key)}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-social-col">
            <span className="footer-col-title">Connect</span>
            <div className="footer-social">
              <a
                className="footer-social-btn"
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                data-cursor="hover"
              >
                <Instagram size={18} strokeWidth={1.8} />
                <span>@{site.instagramHandle}</span>
              </a>
              <a
                className="footer-social-btn"
                href={site.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                data-cursor="hover"
              >
                <Youtube size={18} strokeWidth={1.8} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} {site.brandName}. {t("footer.rights")}
          </span>
          <span className="footer-author">Crafted for {site.fullName}</span>
        </div>
      </div>
    </footer>
  );
}
