import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ArrowRight, PiggyBank, Smartphone, Target, Check } from 'lucide-react';
import Logo from '../components/Logo';

const STEPS = [
  {
    icon: Smartphone,
    color: '#D4583B',
    bg: 'rgba(212,88,59,0.08)',
    en: {
      title: 'Welcome to Gha₹Budget',
      desc: 'Your salary is hard-earned. Every ₹100 matters. We help you see exactly where it goes — no spreadsheets, no confusion.',
      cta: 'Continue',
    },
    hi: {
      title: 'घ₹बजट में आपका स्वागत है',
      desc: 'आपकी मेहनत की कमाई है। हर ₹100 का हिसाब होना चाहिए। हम आपको दिखाते हैं कि पैसा कहाँ जा रहा है — बिना किसी झंझट के।',
      cta: 'आगे बढ़ें',
    },
    mr: {
      title: 'घ₹बजेट मध्ये स्वागत आहे',
      desc: 'तुमची कमाई कष्टाची आहे. प्रत्येक ₹100 महत्त्वाचा आहे. पैसे कुठे जातात ते आम्ही दाखवतो — कोणताही गोंधळ नाही.',
      cta: 'पुढे जा',
    },
    ta: {
      title: 'வரவேற்கிறோம்',
      desc: 'உங்கள் சம்பாத்தியம் கடினமானது. ஒவ்வொரு ₹100-ம் முக்கியம். பணம் எங்கே போகிறது என்பதை தெளிவாக காட்டுவோம்.',
      cta: 'தொடர்க',
    },
  },
  {
    icon: Mic,
    color: '#2D7A5F',
    bg: 'rgba(45,122,95,0.08)',
    en: {
      title: 'Just speak. We listen.',
      desc: '"दो सौ रुपये सब्ज़ी" — say it naturally in Hindi, Marathi, Tamil or English. No typing needed. Like telling a friend.',
      cta: 'Continue',
    },
    hi: {
      title: 'बस बोलिए। हम समझ लेंगे।',
      desc: '"दो सौ रुपये सब्ज़ी" — बस इतना बोलिए। हिंदी, मराठी, तमिल या अंग्रेज़ी — जो भी आपकी भाषा हो। टाइप करने की ज़रूरत नहीं।',
      cta: 'आगे बढ़ें',
    },
    mr: {
      title: 'फक्त बोला. आम्ही ऐकतो.',
      desc: '"दोनशे रुपये भाजी" — इतकं सोपं. हिंदी, मराठी, तमिळ किंवा इंग्रजी — तुमच्या भाषेत बोला. टाइप करायची गरज नाही.',
      cta: 'पुढे जा',
    },
    ta: {
      title: 'பேசுங்கள். நாங்கள் கேட்கிறோம்.',
      desc: '"இருநூறு ரூபாய் காய்கறி" — இயல்பாகச் சொல்லுங்கள். தமிழ், ஹிந்தி, மராத்தி அல்லது ஆங்கிலம் — எது வேணுமானாலும்.',
      cta: 'தொடர்க',
    },
  },
  {
    icon: PiggyBank,
    color: '#E8A849',
    bg: 'rgba(232,168,73,0.08)',
    en: {
      title: 'Watch your savings grow',
      desc: 'Gold necklace, new phone, school fees — set any goal. Add ₹500 today, ₹200 tomorrow. See the bar fill up. Feel the progress.',
      cta: 'Continue',
    },
    hi: {
      title: 'अपनी बचत बढ़ते देखिए',
      desc: 'सोने का हार, नया फ़ोन, स्कूल फीस — कोई भी लक्ष्य बनाइए। आज ₹500, कल ₹200 जमा करिए। बार भरते देखिए।',
      cta: 'आगे बढ़ें',
    },
    mr: {
      title: 'तुमची बचत वाढताना पहा',
      desc: 'सोन्याची चेन, नवीन फोन, शाळेची फी — कोणतंही ध्येय ठरवा. आज ₹500, उद्या ₹200 जमा करा. प्रगती पहा.',
      cta: 'पुढे जा',
    },
    ta: {
      title: 'சேமிப்பு வளர்வதைப் பாருங்கள்',
      desc: 'தங்க நெக்லஸ், புதிய போன், பள்ளி கட்டணம் — இலக்கு வையுங்கள். இன்று ₹500, நாளை ₹200 சேர்யுங்கள்.',
      cta: 'தொடர்க',
    },
  },
  {
    icon: Target,
    color: '#4A7FB5',
    bg: 'rgba(74,127,181,0.08)',
    en: {
      title: 'Take control. Feel lighter.',
      desc: 'No more month-end stress. No more "where did the money go?" Just clarity, savings, and peace of mind.',
      cta: 'Get Started',
    },
    hi: {
      title: 'अब पैसों की चिंता नहीं।',
      desc: 'महीने के आख़िर में तनाव नहीं। "पैसे कहाँ गए?" का सवाल नहीं। बस स्पष्टता, बचत, और सुकून।',
      cta: 'शुरू करें',
    },
    mr: {
      title: 'आता पैशांची काळजी नाही.',
      desc: 'महिन्याच्या शेवटी ताण नाही. "पैसे कुठे गेले?" हा प्रश्न नाही. फक्त स्पष्टता, बचत आणि शांती.',
      cta: 'सुरू करा',
    },
    ta: {
      title: 'கட்டுப்பாட்டில் வையுங்கள்.',
      desc: 'மாத இறுதி கவலை இல்லை. "பணம் எங்கே போனது?" என்ற கேள்வி இல்லை. தெளிவு, சேமிப்பு, மன அமைதி.',
      cta: 'தொடங்குங்கள்',
    },
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.98, transition: { duration: 0.25 } }),
};

const iconVariants = {
  hidden: { scale: 0.6, opacity: 0, rotate: -10 },
  visible: { scale: 1, opacity: 1, rotate: 0, transition: { delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200, damping: 15 } },
};

export default function OnboardingScreen({ lang, onComplete }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const current = STEPS[step];
  const Icon = current.icon;
  const text = current[lang] || current.en;
  const isLast = step === STEPS.length - 1;

  const goNext = useCallback(() => {
    if (isLast) { onComplete(); return; }
    setDir(1);
    setStep(s => s + 1);
  }, [isLast, onComplete]);

  return (
    <div className="flex-1 bg-aub-gradient-deep flex flex-col relative overflow-hidden">

      {/* Ambient glow — follows step color */}
      <motion.div
        key={`glow-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: current.color + '0A' }}
      />

      {/* Skip */}
      <div className="flex justify-end px-5 pt-4 relative z-10">
        <button onClick={onComplete}
          className="text-[11px] text-white/25 font-medium bg-transparent border-none cursor-pointer
            hover:text-white/40 active:text-white/50 transition-colors px-2 py-1">
          Skip
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-7 sm:px-10 relative z-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center text-center w-full max-w-[340px]"
          >
            {/* Icon */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="w-[72px] h-[72px] rounded-[22px] flex items-center justify-center mb-8"
              style={{ background: current.bg }}
            >
              <Icon size={32} style={{ color: current.color }} strokeWidth={1.5} />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-display text-[22px] sm:text-[24px] font-bold text-white leading-[1.25] mb-4"
            >
              {text.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[14px] sm:text-[15px] text-white/40 leading-[1.7] max-w-[300px]"
            >
              {text.desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="px-7 sm:px-10 pb-10 sm:pb-12 relative z-10">

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-7">
          {STEPS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === step ? 28 : 8,
                background: i === step ? current.color : 'rgba(255,255,255,0.12)',
                opacity: i === step ? 1 : 0.6,
              }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="h-[6px] rounded-full"
            />
          ))}
        </div>

        {/* CTA button */}
        <motion.button
          onClick={goNext}
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -1 }}
          className="w-full py-4 rounded-xl text-[15px] font-bold text-white border-none cursor-pointer
            flex items-center justify-center gap-2.5 font-body transition-shadow"
          style={{
            background: current.color,
            boxShadow: `0 4px 20px ${current.color}40`,
          }}
        >
          {text.cta}
          {isLast ? <Check size={18} strokeWidth={2.5} /> : <ArrowRight size={18} />}
        </motion.button>

        {/* Step counter */}
        <p className="text-center mt-4 text-[11px] text-white/15 font-medium">
          {step + 1} / {STEPS.length}
        </p>
      </div>

      {/* Logo watermark */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <Logo className="h-4 opacity-[0.07]" />
      </div>
    </div>
  );
}
