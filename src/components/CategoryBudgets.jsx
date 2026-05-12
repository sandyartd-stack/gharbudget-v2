import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_ICONS, fmt } from '../data/constants';
import { BottomSheet } from './Modal';

export default function CategoryBudgets({ categoryBudgets, categoryTotals, cats, t, onUpdate }) {
  const [editing, setEditing] = useState(null); // category index
  const [editVal, setEditVal] = useState('');

  const openEdit = (ci) => {
    setEditing(ci);
    setEditVal(String(categoryBudgets[ci] || ''));
  };

  const saveEdit = () => {
    if (editing === null) return;
    const val = parseInt(editVal) || 0;
    onUpdate(editing, val);
    setEditing(null);
  };

  // Only show categories that have a budget set or have spending
  const activeCategories = [...new Set([
    ...Object.keys(categoryBudgets).map(Number),
    ...Object.keys(categoryTotals).map(Number),
  ])].sort((a, b) => a - b);

  if (activeCategories.length === 0) return null;

  return (
    <>
      <div className="space-y-2.5">
        {activeCategories.map(ci => {
          const Icon = CATEGORY_ICONS[ci];
          const color = CATEGORY_COLORS[ci];
          const spent = categoryTotals[ci] || 0;
          const budget = categoryBudgets[ci] || 0;
          const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;
          const over = budget > 0 && spent > budget;
          const near = budget > 0 && pct >= 80 && !over;

          return (
            <div key={ci} onClick={() => openEdit(ci)}
              className={`rounded-xl p-3 border cursor-pointer transition-all
                ${over ? 'bg-red-50 border-danger/30' : near ? 'bg-amber-50 border-haldi/30' : 'bg-white border-bdr'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={16} color={color} strokeWidth={1.8} />
                <span className="text-xs font-medium text-ink flex-1">{cats[ci]}</span>
                {over && <AlertTriangle size={14} className="text-danger" />}
                {near && !over && <AlertTriangle size={14} className="text-haldi" />}
                <span className="text-[11px] text-muted">
                  {fmt(spent)}{budget > 0 ? ` / ${fmt(budget)}` : ''}
                </span>
              </div>
              {budget > 0 && (
                <div className="h-1.5 bg-bdr-light rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm transition-all duration-500"
                    style={{ width: `${Math.min(pct, 100)}%`, background: over ? '#C9423F' : near ? '#E8A849' : color }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <BottomSheet open={editing !== null} onClose={() => setEditing(null)}>
        {editing !== null && (() => {
          const Icon = CATEGORY_ICONS[editing];
          return (
            <>
              <h3 className="font-display text-base font-bold text-ink text-center mb-4 flex items-center justify-center gap-2">
                <Icon size={20} color={CATEGORY_COLORS[editing]} /> {cats[editing]}
              </h3>
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">
                Monthly budget limit
              </p>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-lg text-lite font-display">₹</span>
                <input type="text" aria-label="Category budget" value={editVal}
                  onChange={(e) => setEditVal(e.target.value.replace(/\D/g, ''))}
                  placeholder="0 = no limit" inputMode="numeric" autoFocus
                  className="flex-1 px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-lg font-bold text-ink outline-none font-display" />
              </div>
              <div className="flex gap-2.5">
                <button onClick={() => setEditing(null)} className="btn-ghost flex-1">{t('cancel')}</button>
                <button onClick={saveEdit} className="btn-primary flex-1">✓ {t('save')}</button>
              </div>
            </>
          );
        })()}
      </BottomSheet>
    </>
  );
}
