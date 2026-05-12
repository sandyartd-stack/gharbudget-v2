import { CATEGORY_COLORS, CATEGORY_ICONS, fmt } from '../data/constants';

// Mini bar chart — last 6 months spending comparison
export function TrendChart({ monthlyData, currentMonth, lang }) {
  if (monthlyData.length === 0) return null;
  const max = Math.max(...monthlyData.map(d => d.total), 1);

  return (
    <div className="bg-white rounded-[14px] p-4 border border-bdr">
      <div className="flex items-end gap-1.5 h-[100px]">
        {monthlyData.map((d, i) => {
          const h = Math.round((d.total / max) * 100);
          const isCurrent = d.month === currentMonth;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                <div className={`w-full rounded-t-md transition-all duration-500 ${isCurrent ? 'bg-terra' : 'bg-bdr'}`}
                  style={{ height: `${Math.max(h * 0.8, 2)}px` }}
                  title={fmt(d.total)} />
              </div>
              <span className={`text-[8px] ${isCurrent ? 'font-bold text-terra' : 'text-lite'}`}>
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Donut/pie chart for category breakdown
export function CategoryDonut({ categoryTotals, total, cats }) {
  if (total === 0) return null;
  const entries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const cx = 60, cy = 60, r = 48, r2 = 30;

  let angle = -90;
  const slices = entries.map(([ci, amt]) => {
    const pct = amt / total;
    const sweep = pct * 360;
    const startAngle = angle;
    angle += sweep;

    const rad1 = (startAngle * Math.PI) / 180;
    const rad2 = ((startAngle + sweep) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2);
    const large = sweep > 180 ? 1 : 0;

    return (
      <path key={ci}
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
        fill={CATEGORY_COLORS[ci]} opacity="0.85" />
    );
  });

  return (
    <div className="bg-white rounded-[14px] p-4 border border-bdr">
      <div className="flex items-center gap-4">
        <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
          {slices}
          <circle cx={cx} cy={cy} r={r2} fill="white" />
          <text x={cx} y={cy - 2} textAnchor="middle" fontSize="14" fontWeight="700"
            fontFamily="'Fraunces',serif" fill="#1E1E2A">{fmt(total)}</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#8A7F93">total</text>
        </svg>
        <div className="flex-1 flex flex-col gap-1.5">
          {entries.slice(0, 5).map(([ci, amt]) => {
            const Icon = CATEGORY_ICONS[ci];
            const pct = Math.round((amt / total) * 100);
            return (
              <div key={ci} className="flex items-center gap-1.5 text-[11px]">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[ci] }} />
                <Icon size={12} color={CATEGORY_COLORS[ci]} className="shrink-0" />
                <span className="flex-1 text-txt truncate">{cats[ci]}</span>
                <span className="font-semibold text-ink">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
