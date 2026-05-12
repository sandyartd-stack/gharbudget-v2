import { useState } from 'react';
import { Globe, IndianRupee, Download, Info, RotateCcw, LogOut, ChevronRight, AlertTriangle, RefreshCw } from 'lucide-react';
import Logo from '../components/Logo';
import RecurringManager from '../components/RecurringManager';
import { CenterModal } from '../components/Modal';
import { LANG_OPTIONS } from '../data/constants';

export default function SettingsScreen({ store, showToast }) {
  const { t, lang, setLang, phoneNum, monthlyIncome, setIncome, exportCSV, resetAll, logout,
          recurring, addRecurring, removeRecurring } = store;
  const [showAbout, setShowAbout] = useState(false);
  const [showReset, setShowReset] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-aub px-[18px] pt-2 pb-4 shrink-0"><h2 className="font-display text-xl font-bold text-white">{t('profT')}</h2></header>
      <div className="flex-1 overflow-y-auto bg-cotton">
        {/* Avatar */}
        <div className="flex items-center gap-3.5 p-5 bg-white border-b border-bdr-light">
          <div className="w-[50px] h-[50px] rounded-[14px] bg-gradient-to-br from-terra to-haldi flex items-center justify-center text-white">
            <IndianRupee size={22} />
          </div>
          <div><div className="text-sm font-bold text-ink">+91 {phoneNum || '98765 43210'}</div><div className="text-[10px] text-muted mt-0.5">{t('sub')}</div></div>
        </div>

        {/* Language */}
        <div className="px-[18px] pt-4 pb-3">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2 flex items-center gap-1"><Globe size={12} /> {t('lang')}</p>
          <div className="grid grid-cols-2 gap-2">
            {LANG_OPTIONS.map(lo => (
              <div key={lo.c} role="button" tabIndex={0} aria-label={`Switch to ${lo.l}`}
                onClick={() => setLang(lo.c)} onKeyDown={(e) => e.key === 'Enter' && setLang(lo.c)}
                className={`p-3 rounded-xl cursor-pointer border-[1.5px] transition-all ${lang === lo.c ? 'border-terra bg-terra-light' : 'border-bdr bg-white'}`}>
                <div className={`text-[15px] font-bold ${lang === lo.c ? 'text-terra' : 'text-ink'}`}>{lo.n}</div>
                <div className="text-[10px] text-muted mt-0.5">{lo.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recurring Expenses */}
        <div className="px-[18px] pt-2 pb-3">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2 flex items-center gap-1">
            <RefreshCw size={12} /> Recurring Monthly
          </p>
          <RecurringManager recurring={recurring} cats={t('cats')} lang={lang} t={t}
            onAdd={(rec) => { addRecurring(rec); showToast('✓ Added'); }}
            onRemove={(i) => { removeRecurring(i); showToast('Removed'); }} />
        </div>

        {/* Settings rows */}
        <div className="px-[18px] pt-2">
          <div className="flex items-center gap-2.5 py-3 border-b border-bdr-light">
            <IndianRupee size={16} className="text-muted shrink-0" />
            <span className="flex-1 text-sm text-ink">{t('income')}</span>
            <input type="text" aria-label="Monthly income" value={monthlyIncome}
              onChange={(e) => setIncome(parseInt(e.target.value) || 0)} inputMode="numeric"
              className="w-20 text-right border-none bg-transparent text-xs font-semibold text-ink outline-none font-display" />
          </div>

          <button onClick={() => { exportCSV(); showToast('📤 CSV downloaded!'); }}
            className="w-full flex items-center gap-2.5 py-3 border-b border-bdr-light text-sm text-ink cursor-pointer bg-transparent border-x-0 border-t-0">
            <Download size={16} className="text-muted shrink-0" /><span className="flex-1 text-left">{t('exp')}</span><ChevronRight size={14} className="text-lite" />
          </button>

          <button onClick={() => setShowAbout(true)}
            className="w-full flex items-center gap-2.5 py-3 border-b border-bdr-light text-sm text-ink cursor-pointer bg-transparent border-x-0 border-t-0">
            <Info size={16} className="text-muted shrink-0" /><span className="flex-1 text-left">{t('about')}</span><ChevronRight size={14} className="text-lite" />
          </button>

          <button onClick={() => setShowReset(true)}
            className="w-full flex items-center gap-2.5 py-3 border-b border-bdr-light text-sm text-ink cursor-pointer bg-transparent border-x-0 border-t-0">
            <RotateCcw size={16} className="text-muted shrink-0" /><span className="flex-1 text-left">{t('reset')}</span><ChevronRight size={14} className="text-lite" />
          </button>

          <button onClick={logout}
            className="w-full flex items-center gap-2.5 py-3 text-sm text-danger cursor-pointer bg-transparent border-none">
            <LogOut size={16} className="shrink-0" /><span className="flex-1 text-left">{t('logout')}</span>
          </button>
        </div>
        <div className="h-6" />
      </div>

      <CenterModal open={showAbout} onClose={() => setShowAbout(false)}>
        <div className="mb-3"><Logo className="h-11 mx-auto" /></div>
        <p className="text-xs text-muted mb-1">{t('version')}</p><p className="text-xs text-muted mb-1">{t('madeWith')}</p><p className="text-[11px] text-lite mb-4">{t('privacy')}</p>
        <button onClick={() => setShowAbout(false)} className="btn-ghost w-full">OK</button>
      </CenterModal>

      <CenterModal open={showReset} onClose={() => setShowReset(false)}>
        <AlertTriangle size={36} className="mx-auto mb-2 text-danger" />
        <div className="text-sm font-bold text-ink mb-1">{t('reset')}</div><p className="text-xs text-muted mb-4">{t('resetConfirm')}</p>
        <div className="flex gap-2.5"><button onClick={() => setShowReset(false)} className="btn-ghost flex-1">{t('cancel')}</button><button onClick={() => { resetAll(); setShowReset(false); showToast(t('resetDone')); }} className="btn-danger flex-1">{t('reset')}</button></div>
      </CenterModal>
    </div>
  );
}
