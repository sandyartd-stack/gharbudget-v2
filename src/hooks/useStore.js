import { useState, useCallback, useRef, useEffect } from 'react';
import translations from '../data/translations';
import { getDefaultExpenses, DEFAULT_GOALS } from '../data/defaults';
import { today, formatTime, filterByMonth, currentMonth, offsetMonth } from '../utils/dates';
import { generateRecurring } from '../utils/recurring';
import storage from '../utils/storage';

const STORAGE_KEY = 'gb_d';

export default function useStore() {
  const saved = useRef(storage.get(STORAGE_KEY)).current;

  const [lang, setLangState]              = useState(saved?.lang || 'hi');
  const [loggedIn, setLoggedIn]           = useState(saved?.loggedIn || false);
  const [onboarded, setOnboarded]         = useState(saved?.onboarded || false);
  const [phoneNum, setPhoneNum]           = useState(saved?.phoneNum || '');
  const [expenses, setExpenses]           = useState(saved?.expenses || getDefaultExpenses());
  const [goals, setGoals]                 = useState(saved?.goals || structuredClone(DEFAULT_GOALS));
  const [monthlyIncome, setIncomeRaw]     = useState(saved?.monthlyIncome || 25000);
  const [categoryBudgets, setCatBudgets]  = useState(saved?.categoryBudgets || {});
  const [recurring, setRecurring]         = useState(saved?.recurring || []);
  const [nid, setNid]                     = useState(saved?.nid || 7);
  const [gid, setGid]                     = useState(saved?.gid || 4);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // Auto-generate recurring expenses on load
  useEffect(() => {
    if (!loggedIn || recurring.length === 0) return;
    const newExps = generateRecurring(recurring, expenses);
    if (newExps.length > 0) {
      const updated = [...newExps.map((e, i) => ({ ...e, id: nid + i, time: '12:00 AM' })), ...expenses];
      setExpenses(updated);
      setNid(nid + newExps.length);
      persist({ expenses: updated, nid: nid + newExps.length });
    }
  }, [loggedIn]); // Only on login/mount

  const persist = useCallback((overrides = {}) => {
    storage.set(STORAGE_KEY, { lang, loggedIn, onboarded, phoneNum, expenses, goals, monthlyIncome, categoryBudgets, recurring, nid, gid, ...overrides });
  }, [lang, loggedIn, onboarded, phoneNum, expenses, goals, monthlyIncome, categoryBudgets, recurring, nid, gid]);

  const t = useCallback((key) => translations[lang]?.[key] || translations.en[key], [lang]);

  // ─── Auth ───
  const completeOnboarding = useCallback(() => {
    setOnboarded(true);
    storage.set(STORAGE_KEY, { lang, loggedIn, onboarded: true, phoneNum, expenses, goals, monthlyIncome, categoryBudgets, recurring, nid, gid });
  }, [lang, loggedIn, phoneNum, expenses, goals, monthlyIncome, categoryBudgets, recurring, nid, gid]);

  const login = useCallback((phone) => {
    setLoggedIn(true); setPhoneNum(phone);
    storage.set(STORAGE_KEY, { lang, loggedIn: true, onboarded, phoneNum: phone, expenses, goals, monthlyIncome, categoryBudgets, recurring, nid, gid });
  }, [lang, onboarded, expenses, goals, monthlyIncome, categoryBudgets, recurring, nid, gid]);

  const logout = useCallback(() => {
    setLoggedIn(false); setPhoneNum('');
    const fresh = getDefaultExpenses();
    const freshG = structuredClone(DEFAULT_GOALS);
    setExpenses(fresh); setGoals(freshG); setNid(7); setGid(4);
    setCatBudgets({}); setRecurring([]);
    storage.del(STORAGE_KEY);
  }, []);

  // ─── Language ───
  const setLang = useCallback((code) => {
    setLangState(code);
    persist({ lang: code });
  }, [persist]);

  // ─── Income ───
  const setIncome = useCallback((val) => {
    setIncomeRaw(val);
    persist({ monthlyIncome: val });
  }, [persist]);

  // ─── Category Budgets ───
  const setCategoryBudget = useCallback((catIndex, amount) => {
    const updated = { ...categoryBudgets, [catIndex]: amount };
    if (amount === 0) delete updated[catIndex];
    setCatBudgets(updated);
    persist({ categoryBudgets: updated });
  }, [categoryBudgets, persist]);

  // ─── Recurring ───
  const addRecurring = useCallback((rec) => {
    const updated = [...recurring, rec];
    setRecurring(updated);
    persist({ recurring: updated });
  }, [recurring, persist]);

  const removeRecurring = useCallback((index) => {
    const updated = recurring.filter((_, i) => i !== index);
    setRecurring(updated);
    persist({ recurring: updated });
  }, [recurring, persist]);

  // ─── Expenses ───
  const addExpense = useCallback((exp) => {
    const newId = nid;
    const newExp = { ...exp, id: newId, time: formatTime(), date: exp.date || today() };
    const updated = [newExp, ...expenses];
    setExpenses(updated); setNid(newId + 1);
    persist({ expenses: updated, nid: newId + 1 });
    return newId;
  }, [nid, expenses, persist]);

  const editExpense = useCallback((id, updates) => {
    const updated = expenses.map(e => e.id === id ? { ...e, ...updates } : e);
    setExpenses(updated);
    persist({ expenses: updated });
  }, [expenses, persist]);

  const deleteExpense = useCallback((id) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    persist({ expenses: updated });
  }, [expenses, persist]);

  // ─── Goals ───
  const addGoal = useCallback((goal) => {
    const newId = gid;
    const updated = [...goals, { ...goal, id: newId, saved: 0 }];
    setGoals(updated); setGid(newId + 1);
    persist({ goals: updated, gid: newId + 1 });
  }, [gid, goals, persist]);

  const depositGoal = useCallback((id, amount) => {
    const updated = goals.map(g => g.id === id ? { ...g, saved: g.saved + amount } : g);
    setGoals(updated);
    persist({ goals: updated });
  }, [goals, persist]);

  const deleteGoal = useCallback((id) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    persist({ goals: updated });
  }, [goals, persist]);

  // ─── Reset ───
  const resetAll = useCallback(() => {
    setExpenses([]); setGoals(structuredClone(DEFAULT_GOALS));
    setNid(1); setGid(4); setCatBudgets({}); setRecurring([]);
    persist({ expenses: [], goals: structuredClone(DEFAULT_GOALS), nid: 1, gid: 4, categoryBudgets: {}, recurring: [] });
  }, [persist]);

  // ─── Export ───
  const exportCSV = useCallback(() => {
    let csv = 'Date,Category,Description,Amount,Voice,Recurring\n';
    expenses.forEach(e => {
      csv += `${e.date},${translations.en.cats[e.category]},${e.note?.en || ''},${e.amount},${e.voice ? 'Yes' : 'No'},${e.recurring ? 'Yes' : 'No'}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'gharbudget.csv'; a.click();
    URL.revokeObjectURL(url);
  }, [expenses]);

  // ─── Month-filtered computed values ───
  const getMonthData = useCallback((month) => {
    const filtered = filterByMonth(expenses, month);
    const total = filtered.reduce((s, e) => s + e.amount, 0);
    const categoryTotals = {};
    filtered.forEach(e => { categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount; });
    return { expenses: filtered, total, categoryTotals };
  }, [expenses]);

  // ─── Last 6 months trend data ───
  const getTrendData = useCallback(() => {
    const cm = currentMonth();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const m = i === 0 ? cm : offsetMonth(cm, -i);
      const { total } = getMonthData(m);
      const shortMonth = translations[lang]?.cats ? m.split('-')[1] : m.split('-')[1];
      const monthNames = { '01':'J','02':'F','03':'M','04':'A','05':'M','06':'J','07':'J','08':'A','09':'S','10':'O','11':'N','12':'D' };
      months.push({ month: m, total, label: monthNames[m.split('-')[1]] || m.split('-')[1] });
    }
    return months;
  }, [getMonthData, lang]);

  return {
    lang, setLang, t,
    loggedIn, phoneNum, login, logout,
    onboarded, completeOnboarding,
    expenses, addExpense, editExpense, deleteExpense,
    goals, addGoal, depositGoal, deleteGoal,
    monthlyIncome, setIncome,
    categoryBudgets, setCategoryBudget,
    recurring, addRecurring, removeRecurring,
    getMonthData, getTrendData,
    resetAll, exportCSV,
  };
}
