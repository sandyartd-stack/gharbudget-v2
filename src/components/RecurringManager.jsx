import { useState } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { CATEGORY_ICONS, CATEGORY_COLORS, fmt } from '../data/constants';
import CategoryGrid from './CategoryGrid';
import { BottomSheet } from './Modal';
import { RECURRING_TEMPLATES } from '../utils/recurring';

export default function RecurringManager({ recurring, cats, lang, t, onAdd, onRemove }) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(6);
  const [day, setDay] = useState('1');

  const handleSave = () => {
    if (!name.trim() || !amount) return;
    onAdd({ name: name.trim(), amount: parseInt(amount), category, dayOfMonth: parseInt(day) || 1 });
    setShowAdd(false);
    setName(''); setAmount(''); setCategory(6); setDay('1');
  };

  const pickTemplate = (tpl) => {
    setName(lang === 'hi' ? tpl.nameHi : tpl.name);
    setAmount(String(tpl.amount || ''));
    setCategory(tpl.category);
    setDay(String(tpl.dayOfMonth));
  };

  return (
    <>
      <div className="space-y-2">
        {recurring.length === 0 && (
          <p className="text-xs text-muted text-center py-4">No recurring expenses set</p>
        )}
        {recurring.map((rec, i) => {
          const Icon = CATEGORY_ICONS[rec.category];
          return (
            <div key={i} className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-bdr">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: CATEGORY_COLORS[rec.category] + '15' }}>
                <Icon size={16} color={CATEGORY_COLORS[rec.category]} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-ink truncate">{rec.name}</div>
                <div className="text-[10px] text-muted">Day {rec.dayOfMonth} every month</div>
              </div>
              <span className="font-display text-sm font-bold text-ink">{fmt(rec.amount)}</span>
              <button onClick={() => onRemove(i)} aria-label={`Remove ${rec.name}`}
                className="bg-transparent border-none cursor-pointer opacity-40 hover:opacity-70">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      <button onClick={() => setShowAdd(true)}
        className="mt-3 w-full py-2.5 rounded-xl border-[1.5px] border-dashed border-bdr
          bg-white text-xs font-semibold text-muted cursor-pointer flex items-center justify-center gap-1.5">
        <Plus size={14} /> Add recurring expense
      </button>

      <BottomSheet open={showAdd} onClose={() => setShowAdd(false)}>
        <h3 className="font-display text-base font-bold text-ink text-center mb-4">
          <RefreshCw size={18} className="inline mr-1.5 text-terra" />
          Recurring Expense
        </h3>

        {/* Quick templates */}
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-2">Quick pick</p>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {RECURRING_TEMPLATES.map((tpl, i) => (
            <button key={i} onClick={() => pickTemplate(tpl)}
              className="px-2.5 py-1 rounded-lg border border-bdr bg-white text-[10px] font-medium text-txt cursor-pointer hover:border-terra hover:text-terra transition-all">
              {lang === 'hi' ? tpl.nameHi : tpl.name}
            </button>
          ))}
        </div>

        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">Name</p>
        <input type="text" aria-label="Recurring expense name" value={name}
          onChange={(e) => setName(e.target.value)} placeholder="Rent, Electricity..."
          className="w-full px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-sm text-ink outline-none mb-3" />

        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">Amount</p>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-lg text-lite font-display">₹</span>
          <input type="text" aria-label="Amount" value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
            placeholder="5,000" inputMode="numeric"
            className="flex-1 px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-base font-bold text-ink outline-none font-display" />
        </div>

        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">Day of month</p>
        <input type="text" aria-label="Day of month" value={day}
          onChange={(e) => setDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
          placeholder="1" inputMode="numeric"
          className="w-20 px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-sm text-ink outline-none mb-3" />

        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">{t('catL')}</p>
        <div className="mb-4">
          <CategoryGrid cats={cats} selected={category} onSelect={setCategory} />
        </div>

        <div className="flex gap-2.5">
          <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1">{t('cancel')}</button>
          <button onClick={handleSave}
            className={`flex-1 py-3 rounded-xl border-none text-sm font-bold text-white cursor-pointer
              ${name && amount ? 'bg-terra' : 'bg-bdr cursor-default'}`}>
            ✓ {t('save')}
          </button>
        </div>
      </BottomSheet>
    </>
  );
}
