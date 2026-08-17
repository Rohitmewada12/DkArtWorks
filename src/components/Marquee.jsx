const DEFAULT_ITEMS = [
  "Sketches",
  "Paintings",
  "Custom portraits",
  "Commissions open",
  "Devotional art",
  "Graphite & charcoal",
];

/**
 * Full-bleed scrolling ribbon. Renders the item list twice back-to-back
 * so the CSS animation (translateX -50%) loops seamlessly.
 */
export default function Marquee({ items = DEFAULT_ITEMS, tone = "gold" }) {
  const loop = [...items, ...items];
  return (
    <div className={`marquee marquee-${tone}`} aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
