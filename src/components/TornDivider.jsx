import React from "react";
import "./tornDivider.css";

/**
 * Hand-torn deckled paper edge transition between sections.
 * from: "dark" | "light"
 * to: "dark" | "light"
 * tone: "paper" (#F8F0E5) | "dark" (#100D0A)
 */
export default function TornDivider({
  from = "dark",
  to = "light",
  paperColor = "#F8F0E5",
  darkColor = "#100D0A",
}) {
  const isDarkToLight = from === "dark" && to === "light";

  return (
    <div
      className={`torn-divider-wrap ${isDarkToLight ? "dark-to-light" : "light-to-dark"}`}
      aria-hidden="true"
      style={{
        backgroundColor: isDarkToLight ? darkColor : paperColor,
      }}
    >
      <svg
        className="torn-divider-svg"
        viewBox="0 0 1200 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {isDarkToLight ? (
          /* Dark above, torn paper edge expanding downwards */
          <path
            d="M0 36L0 20C45 23 95 14 150 24C210 33 260 16 320 22C390 28 440 18 510 26C580 34 635 15 700 22C765 29 820 18 890 25C950 31 1010 14 1070 24C1125 32 1165 19 1200 22L1200 36L0 36Z"
            fill={paperColor}
          />
        ) : (
          /* Paper above, torn dark edge expanding downwards */
          <path
            d="M0 36L0 18C50 15 105 27 160 19C220 11 275 29 335 21C400 13 455 31 525 21C595 11 650 30 715 20C780 10 835 28 905 19C965 11 1025 29 1085 18C1140 9 1180 23 1200 19L1200 36L0 36Z"
            fill={darkColor}
          />
        )}
      </svg>
    </div>
  );
}
