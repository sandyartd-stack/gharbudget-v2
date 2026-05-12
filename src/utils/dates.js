// Get today's date as ISO string
export function today() {
  return new Date().toISOString().split('T')[0];
}

// Get current month as "YYYY-MM"
export function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// Format "YYYY-MM" to display string per language
const MONTH_NAMES = {
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  hi: ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितम्बर','अक्टूबर','नवंबर','दिसम्बर'],
  mr: ['जानेवारी','फेब्रुवारी','मार्च','एप्रिल','मे','जून','जुलै','ऑगस्ट','सप्टेंबर','ऑक्टोबर','नोव्हेंबर','डिसेंबर'],
  ta: ['ஜனவரி','பிப்ரவரி','மார்ச்','ஏப்ரல்','மே','ஜூன்','ஜூலை','ஆகஸ்ட்','செப்டம்பர்','அக்டோபர்','நவம்பர்','டிசம்பர்'],
};

export function formatMonth(ym, lang = 'en') {
  const [y, m] = ym.split('-').map(Number);
  const names = MONTH_NAMES[lang] || MONTH_NAMES.en;
  return `${names[m - 1]} ${y}`;
}

// Navigate month: offset -1 or +1
export function offsetMonth(ym, offset) {
  const [y, m] = ym.split('-').map(Number);
  const d = new Date(y, m - 1 + offset, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// Format ISO date to localized day label
// Returns "Today", "Yesterday", or "12 May" / "12 मई" etc.
const DAY_NAMES = {
  en: { today: 'Today', yesterday: 'Yesterday' },
  hi: { today: 'आज', yesterday: 'कल' },
  mr: { today: 'आज', yesterday: 'काल' },
  ta: { today: 'இன்று', yesterday: 'நேற்று' },
};

export function formatDayLabel(isoDate, lang = 'en') {
  const t = today();
  const y = offsetDay(t, -1);
  if (isoDate === t) return (DAY_NAMES[lang] || DAY_NAMES.en).today;
  if (isoDate === y) return (DAY_NAMES[lang] || DAY_NAMES.en).yesterday;
  const [yr, mo, dy] = isoDate.split('-').map(Number);
  const names = MONTH_NAMES[lang] || MONTH_NAMES.en;
  return `${dy} ${names[mo - 1]}`;
}

function offsetDay(isoDate, offset) {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

// Filter expenses for a given "YYYY-MM"
export function filterByMonth(expenses, ym) {
  return expenses.filter(e => e.date && e.date.startsWith(ym));
}

// Group expenses by date, sorted newest first
export function groupByDate(expenses) {
  const groups = {};
  expenses.forEach(e => {
    const d = e.date || 'unknown';
    if (!groups[d]) groups[d] = [];
    groups[d].push(e);
  });
  // Sort dates newest first
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
}

// Format time from Date object
export function formatTime() {
  return new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
}
