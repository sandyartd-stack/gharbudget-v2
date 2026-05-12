import { today } from './dates';

// Check and generate recurring expenses for current month
// recurring: [{ name, amount, category, dayOfMonth, note }]
// expenses: existing expenses array
// Returns new expenses to add (if not already present this month)
export function generateRecurring(recurring, expenses) {
  if (!recurring || recurring.length === 0) return [];

  const t = today();
  const currentYM = t.slice(0, 7); // "YYYY-MM"
  const currentDay = parseInt(t.slice(8, 10));
  const newExpenses = [];

  recurring.forEach(rec => {
    // Only generate if we're past the day of month
    if (currentDay < rec.dayOfMonth) return;

    // Check if already generated this month
    const dateStr = `${currentYM}-${String(rec.dayOfMonth).padStart(2, '0')}`;
    const alreadyExists = expenses.some(e =>
      e.date === dateStr &&
      e.amount === rec.amount &&
      e.category === rec.category &&
      e.recurring === true
    );

    if (!alreadyExists) {
      newExpenses.push({
        amount: rec.amount,
        category: rec.category,
        note: { en: rec.name, hi: rec.name, mr: rec.name, ta: rec.name },
        voice: false,
        date: dateStr,
        recurring: true,
      });
    }
  });

  return newExpenses;
}

// Default recurring templates for Indian households
export const RECURRING_TEMPLATES = [
  { name: 'Rent', nameHi: 'किराया', amount: 0, category: 6, dayOfMonth: 1 },
  { name: 'Electricity', nameHi: 'बिजली बिल', amount: 0, category: 4, dayOfMonth: 5 },
  { name: 'Water', nameHi: 'पानी का बिल', amount: 0, category: 4, dayOfMonth: 5 },
  { name: 'Gas Cylinder', nameHi: 'गैस सिलेंडर', amount: 0, category: 6, dayOfMonth: 15 },
  { name: 'Mobile Recharge', nameHi: 'मोबाइल रिचार्ज', amount: 0, category: 4, dayOfMonth: 1 },
  { name: 'School Fees', nameHi: 'स्कूल फीस', amount: 0, category: 3, dayOfMonth: 5 },
  { name: 'Milk (Monthly)', nameHi: 'दूध (मासिक)', amount: 0, category: 0, dayOfMonth: 1 },
  { name: 'Maid Salary', nameHi: 'बाई/काम वाली', amount: 0, category: 6, dayOfMonth: 1 },
];
