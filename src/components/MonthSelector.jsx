import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonth, offsetMonth, currentMonth } from '../utils/dates';

export default function MonthSelector({ month, onChange, lang }) {
  const isCurrentMonth = month === currentMonth();

  return (
    <div className="flex items-center gap-3">
      <button aria-label="Previous month" onClick={() => onChange(offsetMonth(month, -1))}
        className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 border-none cursor-pointer text-white/60 hover:bg-white/20 transition-all">
        <ChevronLeft size={16} />
      </button>
      <span className="text-[13px] font-semibold text-white/80 min-w-[100px] text-center">
        {formatMonth(month, lang)}
      </span>
      <button aria-label="Next month" onClick={() => !isCurrentMonth && onChange(offsetMonth(month, 1))}
        disabled={isCurrentMonth}
        className={`w-7 h-7 rounded-full flex items-center justify-center border-none cursor-pointer transition-all
          ${isCurrentMonth ? 'opacity-20 cursor-default' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
