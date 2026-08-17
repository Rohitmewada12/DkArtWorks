import { useEffect, useState } from "react";
import site from "../data/site.js";

/**
 * A short opening "slate" — fades in the brand name, then fades the
 * whole thing away, like the title card before a film starts. Skips
 * itself entirely for reduced-motion users, and can be dismissed with
 * a click/tap or any key press.
 */
export default function IntroTitleCard() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => setVisible(false), 2200);
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="intro-card"
      onClick={() => setVisible(false)}
      role="presentation"
      aria-hidden="true"
    >
      <span className="intro-card-eyebrow">A commissioned artist</span>
      <h1 className="intro-card-title">{site.brandName}</h1>
      <span className="intro-card-rule" />
    </div>
  );
}
