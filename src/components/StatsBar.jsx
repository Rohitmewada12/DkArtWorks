import site from "../data/site.js";
import useLang from "../LangContext.jsx";
import "./statsbar.css";

export default function StatsBar() {
  const { t } = useLang();
  const stats = site.stats || [];

  if (!stats.length) return null;

  return (
    <div className="stats-bar">
      <div className="wrap stats-bar-row">
        {stats.map((s, i) => (
          <div className="stat" key={s.labelKey}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{t(s.labelKey)}</span>
            {i < stats.length - 1 && <span className="stat-rule" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}
