// Web Speech API voice recognition
// Parses spoken expense: "200 rupees vegetables" → { amount: 200, category: 0, note: "vegetables" }

const LANG_CODES = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
};

// Hindi/Marathi number words
const HINDI_NUMBERS = {
  'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'पाँच': 5,
  'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10,
  'बीस': 20, 'तीस': 30, 'चालीस': 40, 'पचास': 50,
  'साठ': 60, 'सत्तर': 70, 'अस्सी': 80, 'नब्बे': 90,
  'सौ': 100, 'हज़ार': 1000, 'हजार': 1000, 'लाख': 100000,
  'दौ सौ': 200, 'तीन सौ': 300, 'पांच सौ': 500,
};

// Category keyword matching
const CATEGORY_KEYWORDS = [
  /* 0 Groceries */ ['grocery', 'sabzi', 'sabji', 'vegetables', 'ration', 'kirana', 'सब्ज़ी', 'सब्जी', 'किराना', 'राशन', 'भाजी', 'किराणा', 'காய்கறி', 'மளிகை'],
  /* 1 Transport */ ['auto', 'bus', 'taxi', 'uber', 'ola', 'petrol', 'diesel', 'ऑटो', 'बस', 'पेट्रोल', 'ஆட்டோ', 'பஸ்'],
  /* 2 Medical */   ['medicine', 'doctor', 'hospital', 'pharmacy', 'दवाई', 'दवा', 'डॉक्टर', 'औषध', 'மருந்து', 'மருத்துவர்'],
  /* 3 Education */ ['school', 'tuition', 'books', 'fees', 'स्कूल', 'ट्यूशन', 'किताब', 'शाळा', 'பள்ளி', 'கல்வி'],
  /* 4 Bills */     ['bill', 'electricity', 'light', 'water', 'recharge', 'बिजली', 'बिल', 'पानी', 'लाइट', 'மின்சாரம்'],
  /* 5 Clothing */  ['clothes', 'kapda', 'dress', 'कपड़े', 'कपडे', 'ஆடை'],
  /* 6 Household */ ['rent', 'repair', 'cleaning', 'किराया', 'मरम्मत', 'வீடு'],
  /* 7 Food */      ['food', 'restaurant', 'khana', 'chai', 'खाना', 'चाय', 'जेवण', 'உணவு'],
  /* 8 Children */  ['baby', 'diaper', 'toy', 'बच्चा', 'बच्चे', 'मुलं', 'குழந்தை'],
  /* 9 Festival */  ['festival', 'puja', 'pooja', 'त्योहार', 'पूजा', 'सण', 'பண்டிகை'],
  /* 10 Savings */  ['savings', 'deposit', 'बचत', 'जमा', 'சேமிப்பு'],
  /* 11 Other */    [],
];

function parseAmount(text) {
  // Try to find a number
  const numMatch = text.match(/\d+/);
  if (numMatch) return parseInt(numMatch[0]);

  // Try Hindi number words
  const lower = text.toLowerCase();
  for (const [word, val] of Object.entries(HINDI_NUMBERS)) {
    if (lower.includes(word)) return val;
  }
  return null;
}

function parseCategory(text) {
  const lower = text.toLowerCase();
  for (let i = 0; i < CATEGORY_KEYWORDS.length; i++) {
    for (const kw of CATEGORY_KEYWORDS[i]) {
      if (lower.includes(kw.toLowerCase())) return i;
    }
  }
  return 11; // Other
}

// Check if Web Speech API is available
export function isVoiceSupported() {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

// Start listening — returns a Promise that resolves with { amount, category, note, raw }
export function startListening(lang = 'hi') {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      reject(new Error('Voice not supported'));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = LANG_CODES[lang] || 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const raw = event.results[0][0].transcript;
      const amount = parseAmount(raw);
      const category = parseCategory(raw);

      // Clean note: remove numbers, "rupees/रुपये" etc
      let note = raw
        .replace(/\d+/g, '')
        .replace(/rupees?|रुपये|रुपया|रूपये|ரூபாய்/gi, '')
        .trim();

      resolve({ amount, category, note: note || null, raw });
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        resolve({ amount: null, category: 11, note: null, raw: '' });
      } else {
        reject(new Error(event.error));
      }
    };

    recognition.onend = () => {
      // If no result was fired, resolve empty
    };

    recognition.start();

    // Store stop function on the promise for external cancellation
    resolve._recognition = recognition;
  });
}

// Stop any active recognition
export function stopListening(recognition) {
  if (recognition) recognition.stop();
}
