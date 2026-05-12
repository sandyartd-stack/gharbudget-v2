import logoSrc from '../assets/logo';

export default function Logo({ className = 'h-7' }) {
  return <img src={logoSrc} alt="GharBudget" className={`object-contain ${className}`} />;
}
