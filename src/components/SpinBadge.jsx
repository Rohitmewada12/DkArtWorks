const LABEL = "OPEN FOR COMMISSIONS • OPEN FOR COMMISSIONS • ";

export default function SpinBadge({ size = 128, logo = "/gallery/logo.jpg" }) {
  const id = "spin-badge-path";
  return (
    <div
      className="spin-badge-wrap"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg className="spin-badge" width={size} height={size} viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="66" fill="none" stroke="var(--sienna)" strokeWidth="1.5" />
        <path id={id} d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" fill="none" />
        <text
          fontFamily="var(--font-mono)"
          fontSize="9.2"
          fill="var(--sienna-soft)"
          letterSpacing="1.5"
        >
          <textPath href={`#${id}`} startOffset="0%">
            {LABEL}
          </textPath>
        </text>
      </svg>
      {logo && (
        <div className="spin-badge-logo">
          <img src={logo} alt="" />
        </div>
      )}
    </div>
  );
}
