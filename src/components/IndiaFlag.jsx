export default function IndiaFlag({ className = '' }) {
  return (
    <svg viewBox="0 0 24 16" className={`inline-block ${className}`} aria-label="India" role="img">
      <rect width="24" height="5.33" fill="#FF9933" rx="1.5" ry="1.5" />
      <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" rx="1.5" ry="1.5" />
      <circle cx="12" cy="8" r="1.8" fill="none" stroke="#000080" strokeWidth="0.4" />
    </svg>
  );
}
