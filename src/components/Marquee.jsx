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
    // The clip wrapper contains the ribbon's slight rotation so it
    // can't push the page into horizontal scroll — this has to live
    // here (not on <body>), since overflow-x on an ancestor of the
    // nav would break its position: sticky.
    <div className="marquee-clip">
      <div className={`marquee marquee-${tone}`} aria-hidden="true">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}