import { useState, useRef } from 'react';
import { Mic, ArrowLeft, Calendar } from 'lucide-react';
import CategoryGrid from '../components/CategoryGrid';
import { QUICK_AMOUNTS } from '../data/constants';
import { today } from '../utils/dates';
import { isVoiceSupported, startListening } from '../utils/voice';

export default function AddExpenseScreen({ store, onBack, showToast }) {
  const { addExpense, t, lang } = store;
  const [amt, setAmt] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState(0);
  const [date, setDate] = useState(today());
  const [listening, setListening] = useState(false);
  const [micText, setMicText] = useState(t('mic'));
  const recognitionRef = useRef(null);

  const handleMic = async () => {
    if (listening) { setListening(false); setMicText(t('mic')); return; }

    if (!isVoiceSupported()) {
      // Fallback: simulate for browsers without Web Speech API
      setListening(true); setMicText(t('listen'));
      setTimeout(() => { setListening(false); setMicText(t('vr')); setAmt('450'); setCat(0); }, 2000);
      return;
    }

    setListening(true);
    setMicText(t('listen'));

    try {
      const result = await startListening(lang);
      setListening(false);

      if (result.amount) setAmt(String(result.amount));
      if (result.category !== 11) setCat(result.category);
      if (result.note) setDesc(result.note);

      setMicText(result.raw ? `"${result.raw}"` : t('mic'));
    } catch (err) {
      setListening(false);
      setMicText(t('mic'));
      showToast(err.message === 'not-allowed' ? 'Mic permission needed' : 'Try again');
    }
  };

  const handleSave = () => {
    if (!amt) return;
    const cats = t('cats');
    addExpense({
      amount: parseInt(amt),
      category: cat,
      note: { en: desc || cats[cat], hi: desc || cats[cat], mr: desc || cats[cat], ta: desc || cats[cat] },
      voice: false,
      date,
    });
    showToast('✓ ' + t('saved'));
    onBack();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-aub px-3.5 py-2 pb-3.5 shrink-0">
        <div className="flex items-center gap-2.5">
          <button aria-label="Go back" onClick={onBack} className="text-white/70 bg-transparent border-none cursor-pointer"><ArrowLeft size={20} /></button>
          <span className="font-display text-lg font-semibold text-white flex-1">{t('addT')}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-cotton">
        {/* Mic */}
        <div className="text-center pt-5 pb-1.5">
          <button aria-label="Voice input" onClick={handleMic}
            className={`w-14 h-14 rounded-full border-none cursor-pointer inline-flex items-center justify-center text-white transition-all
              ${listening ? 'bg-danger animate-pulse-mic shadow-[0_0_0_8px_rgba(201,66,63,0.15)]' : 'bg-terra shadow-[0_4px_12px_rgba(212,88,59,0.25)]'}`}>
            <Mic size={24} />
          </button>
          <div className="text-[11px] text-muted mt-2 min-h-[16px]">{micText}</div>
        </div>

        {/* Amount */}
        <div className="flex items-baseline justify-center py-1 pb-3">
          <span className="text-3xl text-lite font-display">₹</span>
          <input type="text" aria-label="Expense amount" value={amt}
            onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))}
            placeholder="0" inputMode="numeric"
            className="text-[40px] font-bold border-none bg-transparent w-[120px] text-center text-ink outline-none font-display" />
        </div>

        {/* Quick amounts */}
        <div className="flex gap-1.5 px-3.5 overflow-x-auto mb-3.5">
          {QUICK_AMOUNTS.map(a => (
            <button key={a} onClick={() => setAmt(String(a))}
              className={`px-3.5 py-1.5 rounded-[20px] whitespace-nowrap text-xs font-semibold cursor-pointer border-[1.5px] transition-all
                ${parseInt(amt) === a ? 'bg-terra border-terra text-white' : 'bg-white border-bdr text-txt'}`}>
              ₹{a >= 1000 ? `${a / 1000}K` : a}
            </button>
          ))}
        </div>

        {/* Note */}
        <div className="px-3.5 mb-3">
          <input type="text" aria-label="Expense note" value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={t('what')}
            className="w-full px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white text-sm text-ink outline-none" />
        </div>

        {/* Date */}
        <div className="px-3.5 mb-3.5">
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] border border-bdr bg-white">
            <Calendar size={16} className="text-muted shrink-0" />
            <input type="date" aria-label="Expense date" value={date}
              onChange={(e) => setDate(e.target.value)}
              max={today()}
              className="flex-1 border-none bg-transparent text-sm text-ink outline-none font-body" />
          </div>
        </div>

        {/* Category */}
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide px-3.5 mb-1.5">{t('catL')}</p>
        <div className="px-3.5 pb-5">
          <CategoryGrid cats={t('cats')} selected={cat} onSelect={setCat} />
        </div>
      </div>

      {/* Save */}
      <div className="px-4 py-2.5 pb-3.5 bg-white border-t border-bdr-light shrink-0">
        <button onClick={handleSave} disabled={!amt}
          className={`w-full py-3 rounded-xl border-none text-sm font-bold text-white cursor-pointer font-body transition-all
            ${amt ? 'bg-terra' : 'bg-bdr cursor-default'}`}>
          {t('save')}
        </button>
      </div>
    </div>
  );
}
