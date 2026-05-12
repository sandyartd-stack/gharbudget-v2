import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { BottomSheet, CenterModal } from '../components/Modal';
import { GOAL_ICON_OPTIONS, GOAL_ICON_MAP, fmt } from '../data/constants';

export default function SavingsScreen({ store, showToast }) {
  const { goals, addGoal, depositGoal, deleteGoal, t } = store;
  const [showNew, setShowNew] = useState(false);
  const [depId, setDepId] = useState(null);
  const [delId, setDelId] = useState(null);
  const [gName, setGName] = useState('');
  const [gTarget, setGTarget] = useState('');
  const [gDays, setGDays] = useState('120');
  const [gIcon, setGIcon] = useState('Savings');

  const handleSaveGoal = () => {
    if (!gName.trim() || !gTarget) { showToast(t('goalName')); return; }
    addGoal({ name: gName, icon: gIcon, target: parseInt(gTarget), days: parseInt(gDays) || 120 });
    setShowNew(false); setGName(''); setGTarget(''); setGDays('120'); setGIcon('Savings');
    showToast('✓ ' + t('goalAdded'));
  };
  const handleDeposit = (amt) => { if (!amt || !depId) return; depositGoal(depId, parseInt(amt)); setDepId(null); showToast('✓ ' + t('deposited')); };
  const handleDeleteGoal = () => { deleteGoal(delId); setDelId(null); showToast('🗑 ' + t('goalDeleted')); };

  const depGoal = goals.find(g => g.id === depId);
  const delGoal = goals.find(g => g.id === delId);

  const GoalIcon = ({ iconName, size = 28, className = '' }) => {
    const Icon = GOAL_ICON_MAP[iconName];
    return Icon ? <Icon size={size} className={className} strokeWidth={1.6} /> : <span className={`text-[${size}px]`}>💰</span>;
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-aub px-[18px] pt-2 pb-4 shrink-0"><h2 className="font-display text-xl font-bold text-white">{t('savT')}</h2></header>
      <div className="flex-1 overflow-y-auto bg-cotton px-3.5 pt-3">
        {goals.length === 0 ? (
          <div className="text-center pt-16 px-5"><Plus size={40} className="mx-auto mb-3 text-lite" /><p className="text-sm text-muted leading-relaxed">{t('noGoals')}</p></div>
        ) : goals.map(g => {
          const done = g.saved >= g.target;
          const pct = g.target > 0 ? Math.round((g.saved / g.target) * 100) : 0;
          return (
            <div key={g.id} className={`rounded-[14px] p-4 mb-2.5 border ${done ? 'bg-haldi-light border-haldi' : 'bg-white border-bdr'}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${done ? 'bg-haldi/20 text-haldi-dark' : 'bg-mehendi/10 text-mehendi'}`}>
                  <GoalIcon iconName={g.icon} size={22} />
                </div>
                <div className="flex-1"><div className="text-sm font-bold text-ink">{g.name}</div><div className={`text-[10px] ${done ? 'text-haldi-dark' : 'text-muted'}`}>{done ? t('done') : `${g.days} ${t('dl')}`}</div></div>
                <div className={`font-display text-base font-bold ${done ? 'text-haldi-dark' : 'text-ink'}`}>{pct}%</div>
              </div>
              <div className={`h-1.5 rounded-sm overflow-hidden mb-2 ${done ? 'bg-haldi/20' : 'bg-bdr-light'}`}><div className="h-full rounded-sm transition-all duration-300" style={{ width: `${pct}%`, background: done ? '#E8A849' : '#2D7A5F' }} /></div>
              <div className="flex justify-between items-center text-[11px] text-muted">
                <span>{fmt(g.saved)} {t('of')} {fmt(g.target)}</span>
                <div className="flex gap-3 items-center">
                  {!done && <span onClick={() => setDepId(g.id)} className="font-bold text-mehendi cursor-pointer">+ {t('dep')}</span>}
                  <button onClick={() => setDelId(g.id)} aria-label={`Delete ${g.name}`} className="bg-transparent border-none cursor-pointer opacity-40 hover:opacity-70"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="h-[70px]" />
      </div>
      <button aria-label="New goal" onClick={() => setShowNew(true)} className="absolute bottom-[62px] right-4 h-[46px] px-4 rounded-[23px] bg-haldi flex items-center gap-1.5 text-white text-xs font-semibold z-5 shadow-[0_4px_16px_rgba(232,168,73,0.35)] border-none cursor-pointer">
        <Plus size={18} strokeWidth={2.5} />{t('newGoal')}
      </button>

      {/* New Goal */}
      <BottomSheet open={showNew} onClose={() => setShowNew(false)}>
        <h3 className="font-display text-base font-bold text-ink text-center mb-4">{t('newGoal')}</h3>
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-2">{t('goalIcon')}</p>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {GOAL_ICON_OPTIONS.map(({ icon: Icon, label }) => (
            <span key={label} onClick={() => setGIcon(label)} role="button" tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setGIcon(label)}
              className={`w-10 h-10 rounded-[10px] inline-flex items-center justify-center cursor-pointer border-[1.5px] transition-all
                ${gIcon === label ? 'border-haldi bg-haldi-light text-haldi-dark' : 'border-bdr bg-white text-muted'}`}>
              <Icon size={20} strokeWidth={1.6} />
            </span>
          ))}
        </div>
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">{t('goalName')}</p>
        <input type="text" aria-label="Goal name" value={gName} onChange={(e) => setGName(e.target.value)} placeholder="Gold Necklace..." className="w-full px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-sm text-ink outline-none mb-3" />
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">{t('goalTarget')}</p>
        <div className="flex items-center gap-1 mb-3"><span className="text-lg text-lite font-display">₹</span><input type="text" aria-label="Target amount" value={gTarget} onChange={(e) => setGTarget(e.target.value.replace(/\D/g, ''))} placeholder="10,000" inputMode="numeric" className="flex-1 px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-base font-bold text-ink outline-none font-display" /></div>
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">{t('goalDays')}</p>
        <input type="text" aria-label="Days to achieve" value={gDays} onChange={(e) => setGDays(e.target.value.replace(/\D/g, ''))} placeholder="120" inputMode="numeric" className="w-full px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-sm text-ink outline-none mb-4" />
        <div className="flex gap-2.5"><button onClick={() => setShowNew(false)} className="btn-ghost flex-1">{t('cancel')}</button><button onClick={handleSaveGoal} className="flex-1 py-3 rounded-xl border-none bg-haldi text-white text-sm font-bold cursor-pointer">✓ {t('save')}</button></div>
      </BottomSheet>

      {/* Deposit */}
      <BottomSheet open={!!depId} onClose={() => setDepId(null)}>
        {depGoal && <>
          <h3 className="font-display text-base font-bold text-ink text-center mb-1 flex items-center justify-center gap-2"><GoalIcon iconName={depGoal.icon} size={20} /> {depGoal.name}</h3>
          <p className="text-xs text-muted text-center mb-3">{fmt(depGoal.saved)} {t('of')} {fmt(depGoal.target)}</p>
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-1.5">{t('depositAmt')}</p>
          <div className="flex items-center gap-1 mb-3"><span className="text-lg text-lite font-display">₹</span><input type="text" id="depInput" aria-label="Deposit amount" placeholder="500" inputMode="numeric" autoFocus className="flex-1 px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-lg font-bold text-ink outline-none font-display" /></div>
          <div className="flex gap-1.5 mb-4">{[100, 500, 1000, 2000].map(a => (<button key={a} onClick={() => { document.getElementById('depInput').value = a; }} className="flex-1 text-center px-2 py-1.5 rounded-2xl border-[1.5px] border-bdr bg-white text-xs font-semibold text-txt cursor-pointer">₹{a >= 1000 ? `${a / 1000}K` : a}</button>))}</div>
          <div className="flex gap-2.5"><button onClick={() => setDepId(null)} className="btn-ghost flex-1">{t('cancel')}</button><button onClick={() => handleDeposit(document.getElementById('depInput')?.value)} className="flex-1 py-3 rounded-xl border-none bg-mehendi text-white text-sm font-bold cursor-pointer">+ {t('dep')}</button></div>
        </>}
      </BottomSheet>

      {/* Delete Goal */}
      <CenterModal open={!!delId} onClose={() => setDelId(null)}>
        {delGoal && <>
          <div className="mx-auto mb-2 w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center text-danger"><GoalIcon iconName={delGoal.icon} size={24} /></div>
          <div className="font-display text-base font-bold text-ink mb-1">{delGoal.name}</div>
          <p className="text-xs text-muted mb-4">{t('delGoalConfirm')}</p>
          <div className="flex gap-2.5"><button onClick={() => setDelId(null)} className="btn-ghost flex-1">{t('cancel')}</button><button onClick={handleDeleteGoal} className="btn-danger flex-1">{t('del')}</button></div>
        </>}
      </CenterModal>
    </div>
  );
}
