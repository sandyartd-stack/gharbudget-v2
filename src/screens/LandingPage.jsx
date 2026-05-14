import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mic, PiggyBank, Shield, Smartphone, Globe, TrendingUp,
  Lock, EyeOff, ArrowRight, Star, ChevronDown, Heart,
  ShoppingCart, Zap, GraduationCap, Target, BarChart3,
  RefreshCw, Download, Languages, Users, BadgeCheck,
  Fingerprint, ChevronUp, Phone, MessageCircle,
} from 'lucide-react';
import Logo from '../components/Logo';
import IndiaFlag from '../components/IndiaFlag';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

// ─── FAQ Accordion ───
function FAQ({ question, answer, open, onToggle }) {
  return (
    <div className="border-b border-bdr/60">
      <button onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left bg-transparent border-none cursor-pointer group">
        <span className="text-[14px] font-semibold text-ink pr-4 group-hover:text-terra transition-colors">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          className="shrink-0 text-muted">
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden">
        <p className="text-[13px] text-muted leading-relaxed pb-4 pr-8">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function LandingPage({ onGetStarted, onLogin }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="w-full min-h-[100dvh] bg-cotton overflow-y-auto overflow-x-hidden">

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-cotton/80 backdrop-blur-xl border-b border-bdr/40">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Logo className="h-9" />
          <div className="flex items-center gap-2.5">
            <button onClick={onLogin}
              className="text-[13px] font-semibold text-txt px-4 py-2 rounded-lg
                hover:bg-bdr/30 transition-colors hidden sm:block bg-transparent border-none cursor-pointer">
              Login
            </button>
            <motion.button onClick={onGetStarted} whileTap={{ scale: 0.95 }}
              className="text-[12px] sm:text-[13px] font-bold text-white bg-terra px-5 py-2.5 rounded-lg border-none cursor-pointer
                shadow-[0_2px_10px_rgba(212,88,59,0.2)] hover:shadow-[0_4px_20px_rgba(212,88,59,0.3)] transition-all">
              Get Started Free
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aub-gradient-deep" />
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-terra/[0.05] blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-mehendi/[0.04] blur-[80px]" />

        <div className="relative max-w-[620px] mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 mb-7">
            <IndiaFlag className="w-5 h-3.5" />
            <span className="text-[11px] text-white/50 font-medium">Built for Indian households</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6 }}
            className="font-display text-[30px] sm:text-[46px] font-bold text-white leading-[1.12] mb-5">
            Your salary deserves{' '}
            <span className="text-terra">better tracking.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[15px] sm:text-[17px] text-white/40 leading-[1.7] max-w-[460px] mx-auto mb-9">
            ₹25,000 salary. ₹8,000 rent. ₹3,000 groceries. Where does the rest go?
            Gha₹Budget tells you — in your language, with your voice.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button onClick={onGetStarted} whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto btn-primary px-8 py-4 text-[15px] flex items-center justify-center gap-2">
              Start Free — No Signup <ArrowRight size={18} />
            </motion.button>
            <button onClick={onLogin}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white/50
                border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition-all cursor-pointer">
              <Phone size={15} className="inline mr-1.5 -mt-0.5" />Login with Mobile
            </button>
          </motion.div>

          {/* Phone mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-14 sm:mt-18 mx-auto max-w-[240px] sm:max-w-[270px]">
            <div className="rounded-[26px] border-2 border-white/[0.07] bg-white/[0.03] p-1.5
              shadow-[0_24px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="rounded-[21px] bg-aub overflow-hidden">
                <div className="h-5 flex items-center justify-center"><span className="text-[8px] text-white/15">9:41</span></div>
                <div className="px-3.5 pb-2.5">
                  <div className="flex justify-between items-center mb-2.5"><div className="w-14 h-2.5 bg-white/10 rounded" /><div className="w-9 h-2 bg-white/5 rounded" /></div>
                  <div className="mx-auto w-28 h-20 mb-1">
                    <svg viewBox="0 0 120 80" className="w-full h-full">
                      <path d="M 15 70 A 50 50 0 1 1 105 70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 15 70 A 50 50 0 0 1 75 12" fill="none" stroke="#D4583B" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
                      <path d="M 75 12 A 50 50 0 0 1 100 50" fill="none" stroke="#2D7A5F" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
                      <text x="60" y="46" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="serif">62%</text>
                      <text x="60" y="60" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">₹15,500</text>
                    </svg>
                  </div>
                </div>
                <div className="bg-cotton rounded-t-2xl px-3 py-2 space-y-1">
                  {[
                    { icon: ShoppingCart, color: '#2D7A5F', name: 'सब्ज़ी', amt: '₹450' },
                    { icon: Zap, color: '#E8A849', name: 'बिजली बिल', amt: '₹2,400' },
                    { icon: GraduationCap, color: '#8B5EB0', name: 'ट्यूशन', amt: '₹1,500' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 border-b border-bdr-light/60 last:border-0">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: r.color + '12' }}>
                        <r.icon size={11} color={r.color} />
                      </div>
                      <span className="text-[9px] text-ink flex-1">{r.name}</span>
                      <span className="text-[9px] font-bold text-ink font-serif">{r.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="mt-8">
            <ChevronDown size={18} className="mx-auto text-white/10 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF STATS ─── */}
      <Reveal className="py-10 sm:py-14 border-b border-bdr/40">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <motion.p variants={fadeUp}
            className="text-[11px] font-bold text-terra uppercase tracking-widest text-center mb-8">
            Trusted by Indian families
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: '10K+', label: 'Active families', icon: Users },
              { num: '₹2Cr+', label: 'Expenses tracked', icon: TrendingUp },
              { num: '4.8★', label: 'User rating', icon: Star },
              { num: '4', label: 'Languages', icon: Globe },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="text-center py-4 sm:py-5 rounded-xl bg-white border border-bdr/50
                  hover:shadow-md transition-shadow">
                <s.icon size={18} className="mx-auto mb-2 text-terra" />
                <div className="font-display text-[22px] sm:text-[26px] font-bold text-ink">{s.num}</div>
                <div className="text-[11px] text-muted mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ─── WHY ─── */}
      <Reveal className="py-16 sm:py-20 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.p variants={fadeUp} className="text-[11px] font-bold text-terra uppercase tracking-widest mb-3">
          The Problem
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          className="font-display text-[22px] sm:text-[30px] font-bold text-ink leading-[1.2] mb-5">
          Every Indian household manages ₹15,000–₹50,000 a month.
          <span className="text-muted"> Most do it from memory.</span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2}
          className="text-[14px] text-muted leading-[1.75] max-w-[480px] mx-auto">
          Sabzi ka hisaab. Bijli ka bill. Bacchon ki fees.
          It all adds up — but nobody writes it down. We make it effortless.
          Just speak. We handle the rest.
        </motion.p>
      </Reveal>

      {/* ─── FEATURES ─── */}
      <Reveal className="py-12 sm:py-16 max-w-5xl mx-auto px-5 sm:px-8">
        <motion.p variants={fadeUp} className="text-[11px] font-bold text-terra uppercase tracking-widest mb-3 text-center">
          Features
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          className="font-display text-[22px] sm:text-[28px] font-bold text-ink text-center mb-10 leading-[1.2]">
          Built for how Indian families actually spend
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            { icon: Mic, color: '#D4583B', title: 'Voice-first entry', desc: 'Say "दो सौ रुपये सब्ज़ी" in Hindi, Marathi, Tamil or English. No typing needed.' },
            { icon: Languages, color: '#4A7FB5', title: '4 Indian languages', desc: 'Full app in हिन्दी, मराठी, தமிழ் and English. Switch between them anytime.' },
            { icon: BarChart3, color: '#2D7A5F', title: 'Monthly budget ring', desc: 'See your spending at a glance with a beautiful kolam-inspired visualization.' },
            { icon: Target, color: '#E8A849', title: 'Savings goals', desc: 'Gold necklace, new phone, school fees — set a goal, deposit weekly, feel the progress.' },
            { icon: RefreshCw, color: '#8B5EB0', title: 'Recurring expenses', desc: 'Rent, bijli, maid salary — auto-added every month on the right day.' },
            { icon: TrendingUp, color: '#C75B8E', title: 'Category budgets', desc: 'Set ₹5,000 for groceries, ₹2,000 for transport. Warnings when you cross 80%.' },
            { icon: Download, color: '#3BA4B8', title: 'Export CSV', desc: 'Download all expenses as a spreadsheet. Share with family or your CA.' },
            { icon: Smartphone, color: '#D4733B', title: 'Works offline', desc: 'No internet? No problem. Everything works offline. Syncs when you reconnect.' },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeUp} custom={i * 0.4}
              className="glass-card rounded-2xl p-5 flex gap-4 items-start
                hover:shadow-[0_4px_24px_rgba(27,20,37,0.06)] transition-shadow duration-300">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: f.color + '10' }}>
                <f.icon size={20} color={f.color} strokeWidth={1.6} />
              </div>
              <div><h3 className="text-[14px] font-bold text-ink mb-1">{f.title}</h3><p className="text-[12px] text-muted leading-[1.65]">{f.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ─── SECURITY + PRIVACY ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aub-gradient" />
        <Reveal className="py-16 sm:py-20 max-w-4xl mx-auto px-5 sm:px-8 text-center relative">
          <motion.div variants={fadeUp}
            className="w-16 h-16 rounded-2xl bg-mehendi/15 flex items-center justify-center mx-auto mb-5">
            <Shield size={28} className="text-mehendi" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1}
            className="font-display text-[22px] sm:text-[28px] font-bold text-white mb-3 leading-[1.2]">
            Your money data stays yours. Always.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-[13px] text-white/35 max-w-[440px] mx-auto mb-10 leading-relaxed">
            We never access your bank account. We never sell your data.
            Your expenses live on your phone. Cloud sync is encrypted and optional.
          </motion.p>
          <motion.div variants={fadeUp} custom={3}
            className="grid sm:grid-cols-3 gap-3.5">
            {[
              { icon: Fingerprint, title: 'Phone OTP only', desc: 'No password to remember or forget. Secure OTP verification every time.' },
              { icon: EyeOff, title: 'No bank access', desc: 'We never ask for bank credentials, UPI PIN, or any financial login.' },
              { icon: Lock, title: 'Encrypted sync', desc: 'Cloud backup is per-user encrypted. Only you can read your data.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 text-left sm:text-center
                hover:bg-white/[0.06] transition-colors">
                <s.icon size={22} className="text-mehendi mb-3 sm:mx-auto" />
                <h3 className="text-[13px] font-bold text-white mb-1.5">{s.title}</h3>
                <p className="text-[11px] text-white/35 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <Reveal className="py-16 sm:py-20 max-w-4xl mx-auto px-5 sm:px-8">
        <motion.p variants={fadeUp} className="text-[11px] font-bold text-terra uppercase tracking-widest mb-3 text-center">
          Real Stories
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          className="font-display text-[22px] sm:text-[26px] font-bold text-ink text-center mb-10 leading-[1.2]">
          Families are saving more every month
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-3.5">
          {[
            { name: 'Priya S.', city: 'Mumbai', role: 'Homemaker', quote: 'बोलकर खर्चा जोड़ना बहुत आसान है। पहले सब भूल जाती थी, अब हर रुपये का हिसाब है।', stars: 5 },
            { name: 'Kavitha R.', city: 'Chennai', role: 'Teacher', quote: 'Tamil-ல பேசி செலவு சேர்க்கலாம்! என் மாணவர்களுக்கும் recommend பண்ணிருக்கேன்.', stars: 5 },
            { name: 'Snehal M.', city: 'Pune', role: 'Working mother', quote: 'मुलांची फी, दूध, किराणा — सगळं ट्रॅक होतं. 3 महिन्यात ₹8,000 वाचवले!', stars: 5 },
          ].map((t, i) => (
            <motion.div key={i} variants={fadeUp} custom={i * 0.5}
              className="glass-card rounded-2xl p-5 hover:shadow-[0_4px_24px_rgba(27,20,37,0.06)] transition-shadow">
              <div className="flex gap-0.5 mb-3">
                {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={13} className="text-haldi fill-haldi" />)}
              </div>
              <p className="text-[12px] text-txt leading-[1.7] mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-terra/20 to-haldi/20
                  flex items-center justify-center text-[12px] font-bold text-terra">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-ink">{t.name}</div>
                  <div className="text-[10px] text-muted">{t.role} · {t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ─── FAQ ─── */}
      <Reveal className="py-14 sm:py-18 max-w-2xl mx-auto px-5 sm:px-8">
        <motion.p variants={fadeUp} className="text-[11px] font-bold text-terra uppercase tracking-widest mb-3 text-center">
          Common Questions
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          className="font-display text-[22px] sm:text-[26px] font-bold text-ink text-center mb-8 leading-[1.2]">
          Everything you need to know
        </motion.h2>
        <motion.div variants={fadeUp} custom={2}
          className="glass-card rounded-2xl px-5 sm:px-6 py-1">
          {[
            { q: 'Is Gha₹Budget free?', a: 'Yes, completely free. No premium plans, no hidden charges. We believe every Indian family deserves financial clarity.' },
            { q: 'Is my data safe?', a: 'Your expenses are stored on your device. Cloud sync is optional, encrypted, and only accessible by you. We never share data with anyone.' },
            { q: 'Does it connect to my bank account?', a: 'No. We never ask for bank credentials, UPI PIN, or any financial login. You add expenses manually or by voice — that\'s it.' },
            { q: 'Which languages are supported?', a: 'Hindi (हिन्दी), Marathi (मराठी), Tamil (தமிழ்), and English. The entire app — menus, buttons, voice input — works in all four languages.' },
            { q: 'Can I use it on mobile?', a: 'Yes! Gha₹Budget is built mobile-first. Install it from your browser like an app — no app store needed. Works on Android and iPhone.' },
            { q: 'How does OTP login work?', a: 'Enter your phone number, receive a 6-digit code via SMS, enter it — done. No password to create or remember. Powered by Firebase, same security as Google apps.' },
          ].map((f, i) => (
            <FAQ key={i} question={f.q} answer={f.a}
              open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </motion.div>
      </Reveal>

      {/* ─── FINAL CTA ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aub-gradient-deep" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-terra/[0.04] blur-[120px]" />
        <Reveal className="relative max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <motion.h2 variants={fadeUp}
            className="font-display text-[24px] sm:text-[34px] font-bold text-white leading-[1.15] mb-4">
            Month-end stress?{' '}
            <span className="text-terra">Not anymore.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1}
            className="text-[14px] text-white/35 mb-9 max-w-[400px] mx-auto leading-relaxed">
            Join thousands of Indian families who now know exactly where every rupee goes. Free forever.
          </motion.p>
          <motion.div variants={fadeUp} custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button onClick={onGetStarted} whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto btn-primary px-8 py-4 text-[15px] flex items-center justify-center gap-2">
              Get Started Free <ArrowRight size={18} />
            </motion.button>
          </motion.div>
          <motion.p variants={fadeUp} custom={3}
            className="mt-5 text-[11px] text-white/20 flex items-center justify-center gap-1.5">
            <Lock size={10} /> No signup form · No email · Just your phone number
          </motion.p>
        </Reveal>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-aub px-5 sm:px-8 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo className="h-6 opacity-50" />
            <span className="text-[11px] text-white/20">© 2026 Gha₹Budget</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-white/15">
            <span className="flex items-center gap-1"><Heart size={9} className="text-terra/60" /> Made in India <IndiaFlag className="w-3.5 h-2.5 ml-0.5" /></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
