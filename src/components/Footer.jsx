import { Instagram, Youtube } from "lucide-react";
import site from "../data/site.js";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span className="footer-brand">{site.brandName}</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} {site.brandName}. Original artwork —
          please don't reproduce without asking.
        </span>
        <div className="footer-social">
          <a href={site.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={17} strokeWidth={1.75} />
          </a>
          <a href={site.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube size={17} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}
