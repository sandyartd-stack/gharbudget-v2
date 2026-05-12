import { Home, PieChart, Target, Settings } from 'lucide-react';

const TAB_ICONS = [Home, PieChart, Target, Settings];

export default function TabBar({ tabs, active, onNav }) {
  return (
    <nav role="tablist" aria-label="Navigation"
      className="flex h-14 bg-white border-t border-bdr-light shrink-0 items-center px-2">
      {tabs.map((label, i) => {
        const isActive = active === i;
        const Icon = TAB_ICONS[i];
        return (
          <div key={i} role="tab" tabIndex={0}
            aria-selected={isActive} aria-label={label}
            onClick={() => onNav(i)}
            onKeyDown={(e) => e.key === 'Enter' && onNav(i)}
            className="flex-1 flex flex-col items-center justify-center cursor-pointer gap-1 py-1.5 relative">
            {isActive && <div className="absolute -top-px w-5 h-[3px] rounded-sm bg-terra" />}
            <Icon size={18} strokeWidth={isActive ? 2.2 : 1.6}
              className={`transition-all duration-150 ${isActive ? 'text-terra' : 'text-lite'}`} />
            <span className={`text-[9px] transition-all duration-150
              ${isActive ? 'font-bold text-terra' : 'font-medium text-lite'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
