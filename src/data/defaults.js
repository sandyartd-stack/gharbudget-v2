import { today } from '../utils/dates';

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export function getDefaultExpenses() {
  const t = today();
  const y = daysAgo(1);
  return [
    { id: 1, amount: 450, category: 0, note: { en: 'Weekly ration', hi: 'हफ्ते का राशन', mr: 'आठवड्याचे राशन', ta: 'வார ரேஷன்' }, time: '10:32 AM', voice: true, date: t },
    { id: 2, amount: 120, category: 1, note: { en: 'Auto to school', hi: 'ऑटो स्कूल', mr: 'ऑटो शाळा', ta: 'ஆட்டோ' }, time: '09:15 AM', voice: false, date: t },
    { id: 3, amount: 2400, category: 4, note: { en: 'Electricity', hi: 'बिजली बिल', mr: 'लाइट बिल', ta: 'மின் கட்டணம்' }, time: '06:45 PM', voice: false, date: y },
    { id: 4, amount: 380, category: 2, note: { en: 'Medicine', hi: 'दवाई', mr: 'औषध', ta: 'மருந்து' }, time: '02:10 PM', voice: true, date: y },
    { id: 5, amount: 1500, category: 5, note: { en: 'Kids clothes', hi: 'बच्चों के कपड़े', mr: 'मुलांचे कपडे', ta: 'குழந்தை ஆடை' }, time: '11:00 AM', voice: false, date: y },
    { id: 6, amount: 200, category: 7, note: { en: 'Eating out', hi: 'बाहर का खाना', mr: 'बाहेरचे जेवण', ta: 'உணவகம்' }, time: '08:30 PM', voice: false, date: y },
  ];
}

export const DEFAULT_GOALS = [
  { id: 1, name: 'Gold Necklace', icon: 'Jewellery', saved: 15000, target: 30000, days: 120 },
  { id: 2, name: 'New Phone',     icon: 'Phone',     saved: 8000,  target: 15000, days: 60 },
  { id: 3, name: 'School Fees',   icon: 'Education', saved: 12000, target: 12000, days: 0 },
];
