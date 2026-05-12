import { CATEGORY_COLORS, fmt } from '../data/constants';

export default function KolamArc({ spent, budget, categoryTotals, onDark = true }) {
  const pct = budget > 0 ? Math.min(spent / budget, 1) : 0;
  const entries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const cx = 100, cy = 95, r = 72, totalArc = Math.PI * 1.35, sa = Math.PI * 0.825;

  const petals = [];
  let angle = sa;
  entries.forEach(([ci, amt]) => {
    const sweep = (amt / budget) * totalArc;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep), y2 = cy + r * Math.sin(angle + sweep);
    petals.push(
      <path key={`p${ci}`} d={`M ${x1} ${y1} A ${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x2} ${y2}`}
        fill="none" stroke={CATEGORY_COLORS[ci]} strokeWidth="10" strokeLinecap="round" opacity="0.85" />
    );
    petals.push(<circle key={`d${ci}`} cx={x1} cy={y1} r="3" fill={CATEGORY_COLORS[ci]} opacity="0.4" />);
    angle += sweep;
  });

  const bx1 = cx + r * Math.cos(sa), by1 = cy + r * Math.sin(sa);
  const bx2 = cx + r * Math.cos(sa + totalArc), by2 = cy + r * Math.sin(sa + totalArc);

  const tc1 = onDark ? '#fff' : '#1E1E2A';
  const tc2 = onDark ? 'rgba(255,255,255,.75)' : '#3D3543';
  const tc3 = onDark ? 'rgba(255,255,255,.4)' : '#8A7F93';
  const trk = onDark ? 'rgba(255,255,255,.15)' : '#E8E0D6';

  return (
    <svg width="200" height="160" viewBox="0 0 200 170" className="block mx-auto" role="img"
      aria-label={`Budget: ${Math.round(pct * 100)}% spent`}>
      <circle cx={cx} cy={cy} r="2.5" fill="#D4583B" opacity="0.2" />
      <circle cx={cx} cy={cy - 36} r="1.5" fill="#E8A849" opacity="0.3" />
      <circle cx={cx - 30} cy={cy - 20} r="1.5" fill="#2D7A5F" opacity="0.3" />
      <circle cx={cx + 30} cy={cy - 20} r="1.5" fill="#D4583B" opacity="0.3" />
      <path d={`M ${bx1} ${by1} A ${r} ${r} 0 1 1 ${bx2} ${by2}`}
        fill="none" stroke={trk} strokeWidth="10" strokeLinecap="round" />
      {petals}
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="'Fraunces',serif" fontSize="28" fontWeight="700" fill={tc1}>
        {Math.round(pct * 100)}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="11" fontWeight="600" fill={tc2}>
        {fmt(spent)}
      </text>
      <text x={cx} y={cy + 28} textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="9" fill={tc3}>
        of {fmt(budget)}
      </text>
    </svg>
  );
}
