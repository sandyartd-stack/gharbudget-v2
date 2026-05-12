import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import KolamArc from '../components/KolamArc';
import MonthSelector from '../components/MonthSelector';
import CategoryBudgets from '../components/CategoryBudgets';
import { TrendChart, CategoryDonut } from '../components/SpendingChart';
import { CATEGORY_COLORS, CATEGORY_ICONS, fmt } from '../data/constants';
import { currentMonth } from '../utils/dates';

export default function BudgetScreen({ store }) {
  const { monthlyIncome, t, lang, getMonthData, getTrendData, categoryBudgets, setCategoryBudget } = store;
  const [month, setMonth] = useState(currentMonth());
  const { total, categoryTotals } = getMonthData(month);
  const trendData = getTrendData();

  return (
    <div className="flex flex-col h-full">
      <header className="bg-aub px-[18px] pt-2 pb-4 shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-white">{t('budT')}</h2>
          <MonthSelector month={month} onChange={setMonth} lang={lang} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-cotton">
        {/* Kolam arc */}
        <div className="px-[18px] pt-[18px] text-center">
          <KolamArc spent={total} budget={monthlyIncome} categoryTotals={categoryTotals} onDark={false} />
          <div className="flex justify-center gap-6 mt-2">
            <div><div className="text-[9px] text-lite uppercase">{t('sp')}</div><div className="font-display text-lg font-bold text-terra">{fmt(total)}</div></div>
            <div><div className="text-[9px] text-lite uppercase">{t('re')}</div><div className="font-display text-lg font-bold text-mehendi">{fmt(monthlyIncome - total)}</div></div>
          </div>
        </div>

        {/* Trend chart */}
        <div className="px-[18px] pt-4">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-2 flex items-center gap-1">
            <BarChart3 size={12} /> 6 Month Trend
          </p>
          <TrendChart monthlyData={trendData} currentMonth={month} lang={lang} />
        </div>

        {/* Category donut */}
        <div className="px-[18px] pt-4">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-2">{t('catL')} Breakdown</p>
          <CategoryDonut categoryTotals={categoryTotals} total={total} cats={t('cats')} />
        </div>

        {/* Category budgets */}
        <div className="px-[18px] pt-4 pb-6">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-2">Category Limits</p>
          <CategoryBudgets
            categoryBudgets={categoryBudgets}
            categoryTotals={categoryTotals}
            cats={t('cats')} t={t}
            onUpdate={setCategoryBudget} />
          {Object.keys(categoryBudgets).length === 0 && Object.keys(categoryTotals).length > 0 && (
            <p className="text-[10px] text-muted text-center mt-2">Tap a category above to set a limit</p>
          )}
        </div>
      </div>
    </div>
  );
}
