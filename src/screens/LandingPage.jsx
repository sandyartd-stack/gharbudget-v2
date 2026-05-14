import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mic, PiggyBank, Shield, Smartphone, Globe, TrendingUp,
  Lock, Eye, ArrowRight, Star, ChevronDown, Heart,
  ShoppingCart, Zap, GraduationCap, Target, BarChart3,
  RefreshCw, Download, Languages,
} from 'lucide-react';
import Logo from '../components/Logo';
import IndiaFlag from '../components/IndiaFlag';

// ─── Animation helpers ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
      className={`px-5 sm:px-8 ${className}`}>
      {children}
    </motion.section>
  );
}

export default function LandingPage({ onGetStarted, onLogin }) {
  return (
    <div className="w-full min-h-[100dvh] bg-cotton overflow-y-auto overflow-x-hidden">

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-cotton/80 backdrop-blur-lg border-b border-bdr/50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Logo className="h-7" />
          <div className="flex items-center gap-2">
            <button onClick={onLogin}
              className="text-[12px] font-semibold text-txt px-3 py-1.5 rounded-lg
                hover:bg-bdr/30 transition-colors hidden sm:block">
              Login
            </button>
            <motion.button onClick={onGetStarted} whileTap={{ scale: 0.95 }}
              className="text-[12px] font-bold text-white bg-terra px-4 py-2 rounded-lg
                shadow-[0_2px_8px_rgba(212,88,59,0.2)] hover:shadow-[0_4px_16px_rgba(212,88,59,0.3)]
                transition-all">
              Get Started Free
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aub-gradient-deep" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-terra/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-haldi/[0.04] blur-[80px]" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-1.5 mb-6">
            <IndiaFlag className="w-4 h-3" />
            <span className="text-[11px] text-white/50 font-medium">Made for Indian households</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-[32px] sm:text-[44px] font-bold text-white leading-[1.15] mb-4 max-w-[600px] mx-auto">
            Every rupee counted.{' '}
            <span className="text-terra">Every paisa saved.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[15px] sm:text-[17px] text-white/40 leading-relaxed max-w-[440px] mx-auto mb-8">
            Voice-first budget tracking for Indian families.
            Speak in Hindi, Marathi, Tamil or English — we understand.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button onClick={onGetStarted} whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto btn-primary px-8 py-4 text-[15px] flex items-center justify-center gap-2">
              Start Free — No Signup <ArrowRight size={18} />
            </motion.button>
            <button onClick={onLogin}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white/60
                border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all">
              Login with Mobile
            </button>
          </motion.div>

          {/* Phone mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 sm:mt-16 mx-auto max-w-[260px] sm:max-w-[280px]">
            <div className="rounded-[28px] border-2 border-white/[0.08] bg-white/[0.04] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="rounded-[22px] bg-aub overflow-hidden">
                <div className="h-6 flex items-center justify-center"><span className="text-[9px] text-white/20">9:41</span></div>
                <div className="px-4 pb-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-16 h-3 bg-white/10 rounded" />
                    <div className="w-10 h-2.5 bg-white/5 rounded" />
                  </div>
                  {/* Kolam arc placeholder */}
                  <div className="mx-auto w-32 h-24 relative mb-2">
                    <svg viewBox="0 0 120 80" className="w-full h-full">
                      <path d="M 15 70 A 50 50 0 1 1 105 70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 15 70 A 50 50 0 0 1 75 12" fill="none" stroke="#D4583B" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                      <path d="M 75 12 A 50 50 0 0 1 100 50" fill="none" stroke="#2D7A5F" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
                      <text x="60" y="48" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="serif">62%</text>
                      <text x="60" y="62" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">₹15,500</text>
                    </svg>
                  </div>
                  <div className="flex justify-center gap-6 text-center mb-3">
                    <div><div className="text-[7px] text-white/30 uppercase">Spent</div><div className="text-[12px] font-bold text-white font-serif">₹15,500</div></div>
                    <div><div className="text-[7px] text-white/30 uppercase">Left</div><div className="text-[12px] font-bold text-haldi font-serif">₹9,500</div></div>
                  </div>
                </div>
                {/* Expense rows */}
                <div className="bg-cotton rounded-t-2xl px-3 py-2.5 space-y-1.5">
                  {[
                    { icon: ShoppingCart, color: '#2D7A5F', name: 'सब्ज़ी', amt: '₹450' },
                    { icon: Zap, color: '#E8A849', name: 'बिजली बिल', amt: '₹2,400' },
                    { icon: GraduationCap, color: '#8B5EB0', name: 'ट्यूशन फीस', amt: '₹1,500' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5 border-b border-bdr-light last:border-0">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: row.color + '15' }}>
                        <row.icon size={12} color={row.color} />
                      </div>
                      <span className="text-[10px] text-ink flex-1">{row.name}</span>
                      <span className="text-[10px] font-bold text-ink font-serif">{row.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="mt-8">
            <ChevronDown size={20} className="mx-auto text-white/15 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ─── WHY ─── */}
      <Section className="py-16 sm:py-20 max-w-3xl mx-auto text-center">
        <motion.p variants={fadeUp} className="text-[11px] font-bold text-terra uppercase tracking-widest mb-3">
          The Problem
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          className="font-display text-[24px] sm:text-[30px] font-bold text-ink leading-tight mb-4">
          Indian households manage ₹15,000–₹50,000/month — mostly in their head.
        </motion.h2>
        <motion.p variants={fadeUp} custom={2}
          className="text-[14px] text-muted leading-relaxed max-w-[500px] mx-auto">
          No app speaks their language. No app works with voice. No app understands
          sabzi, auto-rickshaw, or LPG cylinder. Until now.
        </motion.p>
      </Section>

      {/* ─── FEATURES ─── */}
      <Section className="py-12 sm:py-16 max-w-5xl mx-auto">
        <motion.p variants={fadeUp} className="text-[11px] font-bold text-terra uppercase tracking-widest mb-3 text-center">
          Features
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          className="font-display text-[24px] sm:text-[28px] font-bold text-ink text-center mb-10">
          Built for how Indian families actually spend
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Mic, color: '#D4583B', title: 'Voice-first entry', desc: 'Say "200 rupees sabzi" in Hindi, Marathi, Tamil or English. Done.' },
            { icon: Languages, color: '#4A7FB5', title: '4 languages', desc: 'Full app in हिन्दी, मराठी, தமிழ் and English. Switch anytime.' },
            { icon: BarChart3, color: '#2D7A5F', title: 'Monthly budget ring', desc: 'See spending at a glance with the kolam-inspired budget visualization.' },
            { icon: Target, color: '#E8A849', title: 'Savings goals', desc: 'Gold necklace, phone, school fees — set a goal, deposit weekly, track progress.' },
            { icon: RefreshCw, color: '#8B5EB0', title: 'Recurring expenses', desc: 'Rent, electricity, maid salary — auto-added every month on the right day.' },
            { icon: TrendingUp, color: '#C75B8E', title: 'Category budgets', desc: 'Set limits per category. Warnings when you cross 80%. Red when over.' },
            { icon: Download, color: '#3BA4B8', title: 'Export CSV', desc: 'Download all expenses as a spreadsheet. Share with family or CA.' },
            { icon: Smartphone, color: '#D4733B', title: 'Works offline', desc: 'No internet? No problem. Everything works offline and syncs later.' },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeUp} custom={i * 0.5}
              className="glass-card rounded-2xl p-5 flex gap-4 items-start hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: f.color + '12' }}>
                <f.icon size={20} color={f.color} strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-ink mb-1">{f.title}</h3>
                <p className="text-[12px] text-muted leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── SECURITY + PRIVACY ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aub-gradient" />
        <Section className="py-16 sm:py-20 max-w-3xl mx-auto text-center relative">
          <motion.div variants={fadeUp}
            className="w-16 h-16 rounded-2xl bg-mehendi/15 flex items-center justify-center mx-auto mb-5">
            <Shield size={28} className="text-mehendi" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1}
            className="font-display text-[24px] sm:text-[28px] font-bold text-white mb-4">
            Your money data stays yours
          </motion.h2>
          <motion.div variants={fadeUp} custom={2}
            className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Lock, title: 'Phone OTP Login', desc: 'No password to remember. Secure Firebase phone verification.' },
              { icon: Eye, title: 'Privacy First', desc: 'Data stored on your device. Cloud sync only to your own account.' },
              { icon: Shield, title: 'Bank-grade Security', desc: 'Firebase Auth + Firestore with per-user encryption rules.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 text-center">
                <s.icon size={24} className="text-mehendi mx-auto mb-3" />
                <h3 className="text-[13px] font-bold text-white mb-1.5">{s.title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <Section className="py-16 sm:py-20 max-w-4xl mx-auto">
        <motion.p variants={fadeUp} className="text-[11px] font-bold text-terra uppercase tracking-widest mb-3 text-center">
          Early Users
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          className="font-display text-[22px] sm:text-[26px] font-bold text-ink text-center mb-10">
          Families are already saving more
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'Priya S.', city: 'Mumbai', quote: 'बोलकर खर्चा जोड़ना बहुत आसान है। अब हर रुपये का हिसाब रहता है।', stars: 5 },
            { name: 'Kavitha R.', city: 'Chennai', quote: 'Tamil-ல பேசி செலவு சேர்க்கலாம்! மிகவும் எளிது.', stars: 5 },
            { name: 'Snehal M.', city: 'Pune', quote: 'मुलांची फी, दूध, किराणा — सगळं ट्रॅक होतं. खूपच सोपं आहे.', stars: 5 },
          ].map((t, i) => (
            <motion.div key={i} variants={fadeUp} custom={i * 0.5}
              className="glass-card rounded-2xl p-5">
              <div className="flex gap-0.5 mb-3">
                {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={14} className="text-haldi fill-haldi" />)}
              </div>
              <p className="text-[12px] text-txt leading-relaxed mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-terra/10 flex items-center justify-center text-[11px] font-bold text-terra">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-ink">{t.name}</div>
                  <div className="text-[10px] text-muted">{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aub-gradient-deep" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-terra/[0.05] blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <motion.h2 variants={fadeUp}
            className="font-display text-[26px] sm:text-[34px] font-bold text-white leading-tight mb-4">
            Start tracking today.{' '}
            <span className="text-terra">It's free.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1}
            className="text-[14px] text-white/40 mb-8 max-w-[400px] mx-auto">
            No signup form. No email. Just your phone number and you're in.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button onClick={onGetStarted} whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto btn-primary px-8 py-4 text-[15px] flex items-center justify-center gap-2">
              Get Started Free <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-aub px-5 sm:px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo className="h-6 opacity-60" />
            <span className="text-[11px] text-white/25">© 2026 Gha₹Budget</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/20">
            <Heart size={10} className="text-terra" />
            <span>Made with love in India</span>
            <IndiaFlag className="w-4 h-2.5 ml-1" />
          </div>
        </div>
      </footer>
    </div>
  );
}
