import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ArrowRight, PiggyBank, Smartphone, Target } from 'lucide-react';
import Logo from '../components/Logo';

const STEPS = [
  { icon: Smartphone, color: '#D4583B',
    en: { title: 'Welcome to Gha₹Budget', desc: 'Track every rupee your household spends — simple, private, in your language.' },
    hi: { title: 'घ₹बजट में आपका स्वागत', desc: 'अपने घर का हर खर्चा ट्रैक करें — आसान, सुरक्षित, आपकी भाषा में।' },
    mr: { title: 'घ₹बजेट मध्ये स्वागत', desc: 'तुमच्या घरचा प्रत्येक खर्च ट्रॅक करा — सोपे, सुरक्षित, तुमच्या भाषेत।' },
    ta: { title: 'வரவேற்கிறோம்', desc: 'உங்கள் வீட்டின் ஒவ்வொரு செலவையும் கண்காணியுங்கள்.' },
  },
  { icon: Mic, color: '#2D7A5F',
    en: { title: 'Speak to add', desc: 'Just say "200 rupees vegetables" — we understand Hindi, Marathi, Tamil & English.' },
    hi: { title: 'बोलकर जोड़ें', desc: 'बस बोलें "200 रुपये सब्ज़ी" — हम हिंदी, मराठी, तमिल और अंग्रेज़ी समझते हैं।' },
    mr: { title: 'बोलून जोडा', desc: 'फक्त बोला "200 रुपये भाजी" — आम्ही हिंदी, मराठी, तमिळ आणि इंग्रजी समजतो.' },
    ta: { title: 'பேசி சேர்க்கவும்', desc: '"200 ரூபாய் காய்கறி" என்று சொல்லுங்கள்.' },
  },
  { icon: PiggyBank, color: '#E8A849',
    en: { title: 'Swipe to manage', desc: 'Swipe any expense left to edit or delete it. Quick and easy.' },
    hi: { title: 'स्वाइप करके मैनेज करें', desc: 'किसी भी खर्चे को बदलने या हटाने के लिए बाएं स्वाइप करें।' },
    mr: { title: 'स्वाइप करून व्यवस्थापित करा', desc: 'कोणताही खर्च बदलण्यासाठी किंवा काढण्यासाठी डावीकडे स्वाइप करा.' },
    ta: { title: 'ஸ்வைப் செய்யுங்கள்', desc: 'எந்த செலவையும் இடதுபுறமாக ஸ்வைப் செய்யுங்கள்.' },
  },
  { icon: Target, color: '#4A7FB5',
    en: { title: 'Set savings goals', desc: 'Save for gold, a phone, school fees — track progress and deposit anytime.' },
    hi: { title: 'बचत लक्ष्य बनाएं', desc: 'सोना, फ़ोन, स्कूल फीस — अपनी बचत ट्रैक करें और कभी भी जमा करें।' },
    mr: { title: 'बचत ध्येय ठरवा', desc: 'सोने, फोन, शाळेची फी — तुमची प्रगती ट्रॅक करा.' },
    ta: { title: 'சேமிப்பு இலக்கு', desc: 'தங்கம், போன், பள்ளி கட்டணம் — முன்னேற்றத்தை கண்காணியுங்கள்.' },
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.2 } }),
};

export default function OnboardingScreen({ lang, onComplete }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const current = STEPS[step];
  const Icon = current.icon;
  const text = current[lang] || current.en;
  const isLast = step === STEPS.length - 1;

  const goNext = () => { if (isLast) { onComplete(); } else { setDir(1); setStep(step + 1); } };

  return (
    <div className="flex-1 bg-aub-gradient-deep flex flex-col items-center justify-center px-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: current.color + '08' }} />

      <button onClick={onComplete}
        className="absolute top-5 right-5 text-white/25 text-[11px] font-medium bg-transparent border-none cursor-pointer
          hover:text-white/40 transition-colors z-10">
        Skip
      </button>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={step} custom={dir} variants={slideVariants}
          initial="enter" animate="center" exit="exit"
          className="flex flex-col items-center">

          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, duration: 0.3 }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-7"
            style={{ background: current.color + '15' }}>
            <Icon size={36} style={{ color: current.color }} strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-display text-[21px] text-responsive-xl font-bold text-white text-center mb-2.5 leading-tight">{text.title}</h2>
          <p className="text-[13px] text-white/40 text-center leading-relaxed max-w-[280px]">{text.desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mt-10 mb-8">
        {STEPS.map((_, i) => (
          <motion.div key={i}
            animate={{ width: i === step ? 24 : 8, background: i === step ? '#D4583B' : 'rgba(255,255,255,0.15)' }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full" />
        ))}
      </div>

      {/* Button */}
      <motion.button onClick={goNext}
        whileTap={{ scale: 0.95 }}
        className="btn-primary w-full max-w-[280px] flex items-center justify-center gap-2">
        {isLast
          ? (lang === 'hi' ? 'शुरू करें' : lang === 'mr' ? 'सुरू करा' : lang === 'ta' ? 'தொடங்கு' : 'Get Started')
          : <>{lang === 'hi' ? 'आगे' : lang === 'mr' ? 'पुढे' : lang === 'ta' ? 'அடுத்து' : 'Next'} <ArrowRight size={16} /></>
        }
      </motion.button>

      <div className="absolute bottom-6"><Logo className="h-5 opacity-15" /></div>
    </div>
  );
}
