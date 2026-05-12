import { useState } from 'react';
import { Pencil, Trash2, Mic } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_ICONS, fmt } from '../data/constants';

export default function ExpenseRow({ expense, lang, t, swiped, onSwipe, onEdit, onDelete }) {
  const [startX, setStartX] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const isOpen = swiped === expense.id;
  const shift = isOpen ? -116 : offsetX;

  const catName = t('cats')[expense.category];
  const desc = expense.note[lang] || expense.note.en;
  const color = CATEGORY_COLORS[expense.category];
  const CatIcon = CATEGORY_ICONS[expense.category];

  return (
    <div className="relative overflow-hidden" role="listitem">
      <div className="absolute right-0 top-0 bottom-0 flex items-center">
        <div role="button" tabIndex={0} aria-label="Edit expense"
          onClick={() => { onSwipe(null); onEdit(expense); }}
          onKeyDown={(e) => e.key === 'Enter' && (onSwipe(null), onEdit(expense))}
          className="w-[58px] h-full flex flex-col items-center justify-center cursor-pointer text-white text-[9px] font-semibold gap-1 bg-aub-light">
          <Pencil size={14} />{t('edit')}
        </div>
        <div role="button" tabIndex={0} aria-label="Delete expense"
          onClick={() => { onSwipe(null); onDelete(expense); }}
          onKeyDown={(e) => e.key === 'Enter' && (onSwipe(null), onDelete(expense))}
          className="w-[58px] h-full flex flex-col items-center justify-center cursor-pointer text-white text-[9px] font-semibold gap-1 bg-danger">
          <Trash2 size={14} />{t('del')}
        </div>
      </div>
      <div className="flex items-center px-4 py-3 gap-3 border-b border-bdr-light bg-cotton"
        style={{ transform: `translateX(${shift}px)`, transition: startX !== null ? 'none' : 'transform 0.25s cubic-bezier(.4,0,.2,1)', touchAction: 'pan-y' }}
        onPointerDown={(e) => setStartX(e.clientX)}
        onPointerMove={(e) => { if (startX === null) return; const dx = e.clientX - startX; if (dx < 0) setOffsetX(Math.max(dx, -116)); }}
        onPointerUp={() => { if (offsetX < -50) onSwipe(expense.id); else onSwipe(null); setStartX(null); setOffsetX(0); }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '15' }} aria-hidden="true">
          <CatIcon size={20} color={color} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-ink truncate">{desc}</div>
          <div className="text-[10px] text-muted mt-0.5 flex items-center gap-1">
            <span className="font-semibold" style={{ color }}>{catName}</span>
            <span aria-hidden="true">·</span>
            <span>{expense.time}</span>
            {expense.voice && <Mic size={10} className="text-terra" aria-label="Voice entry" />}
          </div>
        </div>
        <div className="font-display text-[17px] font-bold text-ink shrink-0" aria-label={`Amount ${fmt(expense.amount)}`}>
          {fmt(expense.amount)}
        </div>
      </div>
    </div>
  );
}
