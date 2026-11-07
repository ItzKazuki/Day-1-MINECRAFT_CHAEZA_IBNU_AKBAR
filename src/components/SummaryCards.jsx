import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PiggyBank, 
  Eye, 
  EyeOff,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export default function SummaryCards({ stats }) {
  const [showBalance, setShowBalance] = useState(true);

  const displayAmount = (amount) => {
    if (!showBalance) return '••••••••';
    return formatRupiah(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Saldo Bersih */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-lg shadow-slate-900/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-300">Total Saldo Bersih</span>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title={showBalance ? "Sembunyikan Saldo" : "Tampilkan Saldo"}
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold tracking-tight">
            {displayAmount(stats.balance)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Bulan ini:</span>
            <span className={stats.thisMonthBalance >= 0 ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
              {stats.thisMonthBalance >= 0 ? "+" : ""}{displayAmount(stats.thisMonthBalance)}
            </span>
          </div>
        </div>
        {/* Decorative background glow */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. Total Pemasukan */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-500">Pemasukan</span>
          </div>
          <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> Masuk
          </span>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {displayAmount(stats.totalIncome)}
          </div>
          <p className="text-[11px] text-slate-500">
            Bulan ini: <span className="font-semibold text-emerald-600">{displayAmount(stats.thisMonthIncome)}</span>
          </p>
        </div>
      </div>

      {/* 3. Total Pengeluaran */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-500">Pengeluaran</span>
          </div>
          <span className="inline-flex items-center text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
            <ArrowDownRight className="w-3 h-3 mr-0.5" /> Keluar
          </span>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {displayAmount(stats.totalExpense)}
          </div>
          <p className="text-[11px] text-slate-500">
            Bulan ini: <span className="font-semibold text-rose-600">{displayAmount(stats.thisMonthExpense)}</span>
          </p>
        </div>
      </div>

      {/* 4. Rasio Tabungan / Penghematan */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <PiggyBank className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-500">Rasio Tabungan</span>
          </div>
          <span className="text-xs font-bold text-indigo-600">
            {stats.savingsRate}%
          </span>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {stats.savingsRate >= 20 ? 'Sehat 🎉' : stats.savingsRate > 0 ? 'Waspada ⚠️' : 'Defisit 🚨'}
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                stats.savingsRate >= 20 ? 'bg-indigo-600' : stats.savingsRate > 0 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, stats.savingsRate))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
