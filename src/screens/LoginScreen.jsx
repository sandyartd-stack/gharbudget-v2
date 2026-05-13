import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Globe, Loader2, AlertCircle, Phone, ArrowLeft, Shield } from 'lucide-react';
import Logo from '../components/Logo';
import IndiaFlag from '../components/IndiaFlag';
import { toast } from '../components/Toast';
import { LANG_OPTIONS } from '../data/constants';

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25 } },
};

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const fadeItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function LoginScreen({ t, lang, setLang, auth, showToast }) {
  const { sendOTP, verifyOTP, isOtpSent, sending, verifying, error, clearError, initRecaptcha, isDemo } = auth;
  const [phone, setPhone] = useState('');
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => { initRecaptcha('send-otp-btn'); }, [initRecaptcha]);

  const handleSend = async () => {
    clearError();
    const success = await sendOTP(phone);
    if (success) {
      toast.success(lang === 'hi' ? 'OTP भेजा गया' : 'OTP sent!');
      setTimeout(() => otpRefs[0].current?.focus(), 200);
    }
  };

  const handleOtpInput = (i, val) => {
    if (val && i < 5) otpRefs[i + 1].current?.focus();
    if (val && i === 5) {
      const otp = otpRefs.map(r => r.current?.value || '').join('');
      if (otp.length === 6) handleVerify(otp);
    }
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !e.target.value && i > 0) otpRefs[i - 1].current?.focus();
  };

  const handleVerify = async (otp) => {
    const code = otp || otpRefs.map(r => r.current?.value || '').join('');
    if (code.length < (isDemo ? 4 : 6)) { toast.error(isDemo ? 'Enter 4-digit OTP' : 'Enter 6-digit OTP'); return; }
    const success = await verifyOTP(code);
    if (success) toast.success(lang === 'hi' ? 'लॉगिन सफल!' : 'Login successful!');
    else if (error) toast.error(error);
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length >= 4) {
      pasted.split('').forEach((ch, i) => { if (otpRefs[i]?.current) otpRefs[i].current.value = ch; });
      if (pasted.length === 6) handleVerify(pasted);
    }
    e.preventDefault();
  };

  return (
    <div className="flex-1 bg-aub-gradient-deep flex flex-col items-center justify-center px-5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-terra/[0.04] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[200px] h-[200px] rounded-full bg-haldi/[0.03] blur-[60px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {isOtpSent ? (
          /* ─── OTP SCREEN ─── */
          <motion.div key="otp" variants={cardVariants} initial="hidden" animate="visible" exit="exit"
            className="w-full max-w-[340px] flex flex-col items-center">

            <motion.div variants={fadeItem} initial="hidden" animate="visible"
              className="w-16 h-16 rounded-2xl bg-terra/10 flex items-center justify-center mb-4">
              <Lock size={28} className="text-terra" />
            </motion.div>

            <motion.h2 variants={fadeItem} initial="hidden" animate="visible" transition={{ delay: 0.05 }}
              className="font-display text-[22px] text-responsive-2xl font-bold text-white mb-1 text-center">
              {t('enterOtp')}
            </motion.h2>
            <motion.p variants={fadeItem} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="text-[13px] text-white/35 mb-1 text-center">+91 {phone}</motion.p>
            {isDemo && (
              <motion.p variants={fadeItem} initial="hidden" animate="visible" transition={{ delay: 0.12 }}
                className="text-[10px] text-haldi/50 mb-5 text-center">Demo — enter any 4+ digits</motion.p>
            )}

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}
              className="glass-card rounded-2xl p-6 w-full">

              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 bg-danger/5 text-danger text-xs p-3 rounded-xl mb-4 border border-danger/10">
                  <AlertCircle size={14} className="shrink-0" /><span>{error}</span>
                </motion.div>
              )}

              <div className="flex gap-2 justify-center mb-5" onPaste={handlePaste}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <motion.input key={i} ref={otpRefs[i]} maxLength={1}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                    aria-label={`OTP digit ${i + 1}`}
                    type="tel" inputMode="numeric"
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-[52px] rounded-xl border-[1.5px] border-bdr text-center text-xl
                      font-display font-bold text-ink bg-cotton/80 outline-none
                      focus:border-terra focus:shadow-[0_0_0_3px_rgba(212,88,59,0.1)]
                      transition-all duration-200" />
                ))}
              </div>

              <motion.button onClick={() => handleVerify()} disabled={verifying}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full flex items-center justify-center gap-2">
                {verifying ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
                {verifying ? (lang === 'hi' ? 'जांच रहे हैं...' : 'Verifying...') : t('verify')}
              </motion.button>

              <button onClick={() => { clearError(); initRecaptcha('send-otp-btn'); }}
                className="w-full mt-3 text-center text-xs text-muted bg-transparent border-none cursor-pointer
                  hover:text-terra transition-colors py-1">
                <ArrowLeft size={12} className="inline mr-1" />{t('resend')}
              </button>
            </motion.div>
          </motion.div>

        ) : (
          /* ─── PHONE SCREEN ─── */
          <motion.div key="phone" variants={cardVariants} initial="hidden" animate="visible" exit="exit"
            className="w-full max-w-[340px] flex flex-col items-center">

            <motion.div variants={fadeItem} initial="hidden" animate="visible">
              <Logo className="h-14 mb-4" />
            </motion.div>

            <motion.p variants={fadeItem} initial="hidden" animate="visible" transition={{ delay: 0.05 }}
              className="text-[13px] text-white/35 mb-1">{t('sub')}</motion.p>
            {isDemo && (
              <motion.p variants={fadeItem} initial="hidden" animate="visible" transition={{ delay: 0.07 }}
                className="text-[10px] text-haldi/50 mb-6">Demo — Firebase not configured</motion.p>
            )}
            {!isDemo && <div className="mb-7" />}

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-7 w-full">

              <motion.div variants={stagger} initial="hidden" animate="visible">
                <motion.h4 variants={fadeItem}
                  className="font-display text-[17px] font-bold text-ink mb-1 text-center">{t('loginTitle')}</motion.h4>
                <motion.p variants={fadeItem}
                  className="text-[12px] text-muted mb-5 text-center">{t('loginSub')}</motion.p>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 bg-danger/5 text-danger text-xs p-3 rounded-xl mb-4 border border-danger/10">
                    <AlertCircle size={14} className="shrink-0" /><span>{error}</span>
                  </motion.div>
                )}

                <motion.div variants={fadeItem}
                  className="flex items-center gap-2.5 border-[1.5px] border-bdr rounded-xl px-4 py-3 mb-4 input-glow bg-white/60">
                  <IndiaFlag className="w-6 h-4 shrink-0" />
                  <span className="text-[14px] font-semibold text-ink">+91</span>
                  <div className="w-px h-5 bg-bdr mx-0.5" />
                  <input type="tel" maxLength={10} placeholder="98765 43210"
                    aria-label="Mobile number" inputMode="tel"
                    value={phone} onChange={(e) => { setPhone(e.target.value.replace(/[^0-9\s]/g, '')); clearError(); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="border-none outline-none text-[16px] font-medium text-ink flex-1 bg-transparent
                      font-body placeholder:text-lite/60 min-w-0" />
                </motion.div>

                <motion.button variants={fadeItem}
                  id="send-otp-btn"
                  onClick={handleSend}
                  disabled={sending || phone.replace(/\s/g, '').length < 10}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full flex items-center justify-center gap-2">
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Phone size={16} />}
                  {sending ? (lang === 'hi' ? 'भेज रहे हैं...' : 'Sending...') : t('sendOtp')}
                </motion.button>
              </motion.div>

              {/* Language selector */}
              <motion.div variants={fadeItem} className="mt-5 text-center">
                <p className="text-[10px] font-semibold text-muted/70 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                  <Globe size={11} /> {t('lang')}
                </p>
                <div className="flex gap-1.5 justify-center flex-wrap">
                  {LANG_OPTIONS.map(lo => (
                    <motion.button key={lo.c}
                      onClick={() => setLang(lo.c)}
                      whileTap={{ scale: 0.93 }}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] cursor-pointer border transition-all duration-200
                        ${lang === lo.c
                          ? 'font-bold bg-terra/10 text-terra border-terra/40 shadow-[0_0_0_2px_rgba(212,88,59,0.06)]'
                          : 'font-medium bg-cotton/50 text-muted border-bdr/60 hover:border-bdr'}`}>
                      {lo.n}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Trust badge */}
            <motion.div variants={fadeItem} initial="hidden" animate="visible" transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-1.5 text-[10px] text-white/20">
              <Shield size={10} />
              <span>{t('privacy')}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
