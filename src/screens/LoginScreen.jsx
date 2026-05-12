import { useState, useRef } from 'react';
import { Lock, Globe } from 'lucide-react';
import Logo from '../components/Logo';
import { LANG_OPTIONS } from '../data/constants';

export default function LoginScreen({ t, lang, setLang, onLogin, showToast }) {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const sendOtp = () => {
    if (phone.replace(/\s/g, '').length < 10) { showToast('Enter 10 digit number'); return; }
    setStep(1);
    setTimeout(() => otpRefs[0].current?.focus(), 100);
  };
  const otpNext = (i, val) => { if (val && i < 3) otpRefs[i + 1].current?.focus(); };
  const verify = () => {
    const otp = otpRefs.map(r => r.current?.value || '').join('');
    if (otp.length < 4) { showToast('Enter 4-digit OTP'); return; }
    onLogin(phone);
  };

  if (step === 1) {
    return (
      <div className="flex-1 bg-aub flex flex-col items-center justify-center px-8">
        <Lock size={40} className="text-terra mb-3" />
        <h2 className="font-display text-[22px] font-bold text-white mb-1">{t('enterOtp')}</h2>
        <p className="text-xs text-white/40 mb-6">+91 {phone}</p>
        <div className="bg-white rounded-2xl p-6 w-full max-w-[300px]">
          <div className="flex gap-2 justify-center mb-4">
            {[0, 1, 2, 3].map(i => (
              <input key={i} ref={otpRefs[i]} maxLength={1} aria-label={`OTP digit ${i + 1}`}
                onChange={(e) => otpNext(i, e.target.value)}
                className="w-11 h-12 rounded-[10px] border-[1.5px] border-bdr text-center text-xl font-display font-bold text-ink bg-cotton outline-none focus:border-terra" />
            ))}
          </div>
          <button onClick={verify} aria-label="Verify OTP" className="btn-primary w-full">{t('verify')}</button>
          <p onClick={() => setStep(0)} className="text-center mt-3 text-xs text-muted cursor-pointer">← {t('resend')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-aub flex flex-col items-center justify-center px-8">
      <Logo className="h-12 mb-3" />
      <p className="text-xs text-white/40 mb-9">{t('sub')}</p>
      <div className="bg-white rounded-2xl p-6 w-full max-w-[300px]">
        <h4 className="font-display text-[15px] font-bold text-ink mb-3.5 text-center">{t('loginTitle')}</h4>
        <p className="text-xs text-muted mb-3.5 text-center">{t('loginSub')}</p>
        <div className="flex items-center gap-2 border-[1.5px] border-bdr rounded-xl px-3.5 py-2.5 mb-3">
          <span className="text-sm font-semibold text-ink">+91</span>
          <input type="tel" maxLength={10} placeholder="98765 43210" aria-label="Mobile number"
            value={phone} onChange={(e) => setPhone(e.target.value)}
            className="border-none outline-none text-base font-medium text-ink flex-1 bg-transparent font-body" />
        </div>
        <button onClick={sendOtp} aria-label="Send OTP" className="btn-primary w-full mt-1">{t('sendOtp')}</button>
        <div className="mt-4 text-center">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1">
            <Globe size={12} /> {t('lang')}
          </p>
          <div className="flex gap-1.5 justify-center flex-wrap">
            {LANG_OPTIONS.map(lo => (
              <span key={lo.c} onClick={() => setLang(lo.c)} role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLang(lo.c)}
                className={`px-3 py-1 rounded-2xl text-[11px] cursor-pointer border transition-all
                  ${lang === lo.c ? 'font-bold bg-terra/10 text-terra border-terra' : 'font-medium bg-white/10 text-muted border-bdr'}`}>
                {lo.n}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-[10px] text-white/25">{t('privacy')}</p>
    </div>
  );
}
