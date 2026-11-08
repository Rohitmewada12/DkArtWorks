import { Award, Clock, Star, Zap } from "lucide-react";
import site from "../data/site.js";
import useLang from "../LangContext.jsx";
import "./statsbar.css";

const ICONS = {
  "stats.commissions": Award,
  "stats.rating": Star,
  "stats.years": Clock,
  "stats.replyTime": Zap,
};

export default function StatsBar() {
  const { t } = useLang();
  const stats = site.stats || [];

  if (!stats.length) return null;

  return (
    <section className="stats-bar" aria-label="Artist Statistics">
      <div className="wrap stats-bar-row">
        {stats.map((s, i) => {
          const IconComponent = ICONS[s.labelKey] || Award;
          return (
            <div className="stat-item" key={s.labelKey}>
              <div className="stat-icon-wrap" aria-hidden="true">
                <IconComponent size={22} strokeWidth={1.75} className="stat-icon" />
              </div>
              <div className="stat-body">
                <span className="stat-number">{s.value}</span>
                <span className="stat-caption">{t(s.labelKey)}</span>
              </div>
              {i < stats.length - 1 && <span className="stat-divider" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
