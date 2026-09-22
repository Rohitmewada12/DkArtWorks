import { Instagram, Youtube } from "lucide-react";
import site from "../data/site.js";
import useLang from "../LangContext.jsx";
import "./footer.css";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span className="footer-brand">{site.brandName}</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} {site.brandName}. {t("footer.rights")}
        </span>
        <div className="footer-social">
          <a
            className="footer-social-btn"
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            data-cursor="hover"
          >
            <Instagram size={20} strokeWidth={1.75} />
          </a>
          <a
            className="footer-social-btn"
            href={site.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            data-cursor="hover"
          >
            <Youtube size={20} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}