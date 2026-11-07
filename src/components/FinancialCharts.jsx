import React, { useState } from 'react';
import { PieChart, BarChart3, Info } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export default function FinancialCharts({ stats }) {
  const { categoryBreakdown, monthlyHistory, totalExpense } = stats;
  const [activeCategory, setActiveCategory] = useState(null);

  // SVG Donut calculation
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* 1. Pengeluaran Berdasarkan Kategori (Donut Chart) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Alokasi Pengeluaran</h2>
              <p className="text-xs text-slate-400">Distribusi biaya per kategori</p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Total: {formatRupiah(totalExpense)}
          </span>
        </div>

        {categoryBreakdown.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs">
            <Info className="w-8 h-8 text-slate-300 mb-2" />
            Belum ada data pengeluaran untuk dianalisis
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6 my-auto pt-2">
            {/* SVG Donut */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg width={size} height={size} className="transform -rotate-90">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth={strokeWidth}
                />
                {categoryBreakdown.map((item, index) => {
                  const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                  accumulatedPercent += item.percentage;

                  const isHovered = activeCategory === item.category;

                  return (
                    <circle
                      key={item.category || index}
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setActiveCategory(item.category)}
                      onMouseLeave={() => setActiveCategory(null)}
                    />
                  );
                })}
              </svg>
              {/* Center text in donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                <span className="text-[11px] text-slate-400 font-medium">
                  {activeCategory || 'Kategori Terbesar'}
                </span>
                <span className="text-sm font-bold text-slate-800 truncate max-w-[110px]">
                  {activeCategory 
                    ? `${categoryBreakdown.find(c => c.category === activeCategory)?.percentage}%`
                    : `${categoryBreakdown[0]?.percentage || 0}%`}
                </span>
              </div>
            </div>

            {/* Legend List */}
            <div className="w-full space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {categoryBreakdown.map((item) => (
                <div
                  key={item.category}
                  onMouseEnter={() => setActiveCategory(item.category)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeCategory === item.category ? 'bg-slate-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="font-medium text-slate-700 truncate">{item.category}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-semibold text-slate-900">{item.percentage}%</span>
                    <span className="text-[10px] text-slate-400 block">{formatRupiah(item.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Tren Keuangan Bulanan (Bar Chart) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Tren Masuk vs Keluar</h2>
              <p className="text-xs text-slate-400">Riwayat performa keuangan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Pemasukan
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Pengeluaran
            </span>
          </div>
        </div>

        {monthlyHistory.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs">
            <Info className="w-8 h-8 text-slate-300 mb-2" />
            Belum ada riwayat transaksi bulanan
          </div>
        ) : (
          <div className="pt-4">
            {/* Chart Area */}
            {(() => {
              const maxVal = Math.max(
                ...monthlyHistory.flatMap(m => [m.income, m.expense]),
                1
              );

              return (
                <div className="flex items-end justify-between gap-3 h-44 border-b border-slate-200 pb-2 px-2">
                  {monthlyHistory.map((m, idx) => {
                    const incomeHeight = Math.round((m.income / maxVal) * 100);
                    const expenseHeight = Math.round((m.expense / maxVal) * 100);

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        {/* Tooltip on hover */}
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] rounded-lg p-2 pointer-events-none z-20 whitespace-nowrap shadow-xl">
                          <div>Masuk: {formatRupiah(m.income)}</div>
                          <div>Keluar: {formatRupiah(m.expense)}</div>
                        </div>

                        {/* Bars */}
                        <div className="w-full flex items-end justify-center gap-1.5 h-full">
                          {/* Income Bar */}
                          <div
                            style={{ height: `${Math.max(4, incomeHeight)}%` }}
                            className="w-1/2 max-w-[20px] bg-emerald-500 rounded-t-md hover:brightness-110 transition-all duration-300"
                            title={`Pemasukan: ${formatRupiah(m.income)}`}
                          />
                          {/* Expense Bar */}
                          <div
                            style={{ height: `${Math.max(4, expenseHeight)}%` }}
                            className="w-1/2 max-w-[20px] bg-rose-500 rounded-t-md hover:brightness-110 transition-all duration-300"
                            title={`Pengeluaran: ${formatRupiah(m.expense)}`}
                          />
                        </div>
                        {/* Month Label */}
                        <span className="text-[10px] font-semibold text-slate-500 mt-2 truncate w-full text-center">
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
