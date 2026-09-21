import site from "../data/site.js";
import useLang from "../LangContext.jsx";
import "./whatsapp.css";

// Small inline brand mark — kept as SVG so it reads as "WhatsApp" at a
// glance rather than a generic chat bubble.
function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.26-8.23 2.21 0 4.28.86 5.84 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.54-3.71 8.23-8.27 8.23Zm4.52-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const { t } = useLang();
  if (!site.whatsappNumber) return null;

  const href = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    site.whatsappMessage || ""
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      data-cursor="hover"
    >
      <WhatsAppIcon />
      <span className="whatsapp-fab-tooltip">{t("whatsapp.tooltip")}</span>
    </a>
  );
}
