import { useState } from 'react';
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
    en: { title: 'Speak to add', desc: 'Just say "200 rupees vegetables" — we\'ll understand Hindi, Marathi, Tamil & English.' },
    hi: { title: 'बोलकर जोड़ें', desc: 'बस बोलें "200 रुपये सब्ज़ी" — हम हिंदी, मराठी, तमिल और अंग्रेज़ी समझते हैं।' },
    mr: { title: 'बोलून जोडा', desc: 'फक्त बोला "200 रुपये भाजी" — आम्ही हिंदी, मराठी, तमिळ आणि इंग्रजी समजतो.' },
    ta: { title: 'பேசி சேர்க்கவும்', desc: '"200 ரூபாய் காய்கறி" என்று சொல்லுங்கள் — நாங்கள் புரிந்துகொள்வோம்.' },
  },
  { icon: PiggyBank, color: '#E8A849',
    en: { title: 'Swipe to manage', desc: 'Swipe any expense left to edit or delete it. Quick and easy.' },
    hi: { title: 'स्वाइप करके मैनेज करें', desc: 'किसी भी खर्चे को बदलने या हटाने के लिए बाएं स्वाइप करें।' },
    mr: { title: 'स्वाइप करून व्यवस्थापित करा', desc: 'कोणताही खर्च बदलण्यासाठी किंवा काढण्यासाठी डावीकडे स्वाइप करा.' },
    ta: { title: 'ஸ்வைப் செய்யுங்கள்', desc: 'எந்த செலவையும் இடதுபுறமாக ஸ்வைப் செய்து மாற்றவும் அல்லது நீக்கவும்.' },
  },
  { icon: Target, color: '#4A7FB5',
    en: { title: 'Set savings goals', desc: 'Save for gold, a phone, school fees — track your progress and deposit anytime.' },
    hi: { title: 'बचत लक्ष्य बनाएं', desc: 'सोना, फ़ोन, स्कूल फीस — अपनी बचत ट्रैक करें और कभी भी जमा करें।' },
    mr: { title: 'बचत ध्येय ठरवा', desc: 'सोने, फोन, शाळेची फी — तुमची प्रगती ट्रॅक करा आणि केव्हाही जमा करा.' },
    ta: { title: 'சேமிப்பு இலக்கு', desc: 'தங்கம், போன், பள்ளி கட்டணம் — முன்னேற்றத்தை கண்காணியுங்கள்.' },
  },
];

export default function OnboardingScreen({ lang, onComplete }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Icon = current.icon;
  const text = current[lang] || current.en;
  const isLast = step === STEPS.length - 1;

  return (
    <div className="flex-1 bg-aub flex flex-col items-center justify-center px-8 relative">
      {/* Skip */}
      <button onClick={onComplete}
        className="absolute top-4 right-5 text-white/30 text-xs font-medium bg-transparent border-none cursor-pointer">
        Skip
      </button>

      {/* Icon */}
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-300"
        style={{ background: current.color + '20' }}>
        <Icon size={36} style={{ color: current.color }} strokeWidth={1.6} />
      </div>

      {/* Text */}
      <h2 className="font-display text-xl font-bold text-white text-center mb-2">{text.title}</h2>
      <p className="text-sm text-white/50 text-center leading-relaxed max-w-[280px] mb-10">{text.desc}</p>

      {/* Dots */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300
            ${i === step ? 'bg-terra w-6' : 'bg-white/20'}`} />
        ))}
      </div>

      {/* Button */}
      <button onClick={() => isLast ? onComplete() : setStep(step + 1)}
        className="w-full max-w-[280px] py-3.5 rounded-xl bg-terra text-white text-sm font-bold
          border-none cursor-pointer flex items-center justify-center gap-2 font-body">
        {isLast ? (lang === 'hi' ? 'शुरू करें' : lang === 'mr' ? 'सुरू करा' : lang === 'ta' ? 'தொடங்கு' : 'Get Started') : null}
        {!isLast && <ArrowRight size={18} />}
        {!isLast && (lang === 'hi' ? 'आगे' : lang === 'mr' ? 'पुढे' : lang === 'ta' ? 'அடுத்து' : 'Next')}
      </button>

      {/* Logo */}
      <div className="absolute bottom-6">
        <Logo className="h-5 opacity-20" />
      </div>
    </div>
  );
}
