import { useState } from 'react';
import { Plus, Mic } from 'lucide-react';
import Logo from '../components/Logo';
import KolamArc from '../components/KolamArc';
import MonthSelector from '../components/MonthSelector';
import ExpenseRow from '../components/ExpenseRow';
import CategoryGrid from '../components/CategoryGrid';
import { BottomSheet, CenterModal } from '../components/Modal';
import { CATEGORY_ICONS, fmt } from '../data/constants';
import { currentMonth, groupByDate, formatDayLabel } from '../utils/dates';

export default function HomeScreen({ store, showToast, onAdd }) {
  const { monthlyIncome, editExpense, deleteExpense, t, lang, getMonthData } = store;
  const [month, setMonth] = useState(currentMonth());
  const [swiped, setSwiped] = useState(null);
  const [editExp, setEditExp] = useState(null);
  const [delExp, setDelExp] = useState(null);
  const [editAmt, setEditAmt] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCat, setEditCat] = useState(0);

  const { expenses: filtered, total, categoryTotals } = getMonthData(month);
  const grouped = groupByDate(filtered);

  const openEdit = (e) => { setEditExp(e); setEditAmt(String(e.amount)); setEditDesc(e.note[lang] || e.note.en); setEditCat(e.category); };
  const saveEdit = () => {
    if (!editAmt || !editExp) return;
    editExpense(editExp.id, { amount: parseInt(editAmt), note: { ...editExp.note, [lang]: editDesc }, category: editCat });
    setEditExp(null); showToast('✓ ' + t('saved'));
  };
  const confirmDelete = () => { if (!delExp) return; deleteExpense(delExp.id); setDelExp(null); showToast('🗑 ' + t('del')); };
  const DelIcon = delExp ? CATEGORY_ICONS[delExp.category] : null;

  return (
    <div className="flex flex-col h-full">
      <header className="bg-aub px-[18px] pt-2 shrink-0">
        <div className="flex justify-between items-center">
          <Logo className="h-7" />
          <MonthSelector month={month} onChange={setMonth} lang={lang} />
        </div>
        <KolamArc spent={total} budget={monthlyIncome} categoryTotals={categoryTotals} onDark={true} />
        <div className="flex justify-center gap-7 pb-3.5 -mt-1">
          <div className="text-center"><div className="text-[9px] text-white/40 uppercase tracking-wide">{t('spent')}</div><div className="font-display text-lg font-bold text-white">{fmt(total)}</div></div>
          <div className="w-px bg-white/10" />
          <div className="text-center"><div className="text-[9px] text-white/40 uppercase tracking-wide">{t('rem')}</div><div className="font-display text-lg font-bold text-haldi">{fmt(monthlyIncome - total)}</div></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-cotton" role="list" onClick={() => setSwiped(null)}>
        {filtered.length === 0 ? (
          <div className="text-center pt-16 px-8"><Mic size={40} className="mx-auto mb-3 text-lite" /><p className="text-sm text-muted">{t('swipe')}</p></div>
        ) : (
          <>
            <p className="px-4 pt-2 pb-1 text-[9px] text-lite font-medium">{t('swipe')}</p>
            {grouped.map(([date, exps]) => (
              <div key={date}>
                <div className="day-label">{formatDayLabel(date, lang)}</div>
                {exps.map(e => <ExpenseRow key={e.id} expense={e} lang={lang} t={t} swiped={swiped} onSwipe={setSwiped} onEdit={openEdit} onDelete={setDelExp} />)}
              </div>
            ))}
          </>
        )}
        <div className="h-[70px]" />
      </div>

      <button aria-label="Add expense" onClick={onAdd} className="absolute bottom-[62px] right-4 h-[46px] px-4 rounded-[23px] bg-terra flex items-center gap-1.5 text-white text-xs font-semibold z-5 shadow-[0_4px_16px_rgba(212,88,59,0.35)] border-none cursor-pointer">
        <Plus size={18} strokeWidth={2.5} />{t('addT')}
      </button>

      <BottomSheet open={!!editExp} onClose={() => setEditExp(null)}>
        <h3 className="font-display text-base font-bold text-ink text-center mb-4">{t('editExp')}</h3>
        <div className="flex items-baseline justify-center mb-3.5"><span className="text-2xl text-lite font-display">₹</span><input type="text" aria-label="Edit amount" value={editAmt} onChange={(e) => setEditAmt(e.target.value.replace(/\D/g, ''))} className="text-[34px] font-bold border-none border-b-2 border-b-terra bg-transparent w-[110px] text-center text-ink outline-none font-display pb-1" autoFocus /></div>
        <input type="text" aria-label="Edit description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder={t('what')} className="w-full px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-sm text-ink outline-none mb-3.5" />
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-2">{t('catL')}</p>
        <div className="mb-4"><CategoryGrid cats={t('cats')} selected={editCat} onSelect={setEditCat} /></div>
        <div className="flex gap-2.5"><button onClick={() => setEditExp(null)} className="btn-ghost flex-1">{t('cancel')}</button><button onClick={saveEdit} className="btn-primary flex-1">✓ {t('save')}</button></div>
      </BottomSheet>

      <CenterModal open={!!delExp} onClose={() => setDelExp(null)}>
        {DelIcon && <DelIcon size={36} className="mx-auto mb-2 text-muted" />}
        <div className="font-display text-lg font-bold text-ink mb-1">{delExp && fmt(delExp.amount)}</div>
        <p className="text-xs text-muted mb-4">{t('delConfirm')}</p>
        <div className="flex gap-2.5"><button onClick={() => setDelExp(null)} className="btn-ghost flex-1">{t('cancel')}</button><button onClick={confirmDelete} className="btn-danger flex-1">{t('del')}</button></div>
      </CenterModal>
    </div>
  );
}
