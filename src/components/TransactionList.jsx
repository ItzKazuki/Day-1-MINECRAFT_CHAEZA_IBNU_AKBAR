import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  ArrowUpRight, 
  ArrowDownRight, 
  Inbox,
  ArrowUpDown
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export default function TransactionList({ 
  transactions, 
  onEdit, 
  onDelete, 
  onAddNew 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all | income | expense
  const [periodFilter, setPeriodFilter] = useState('all'); // all | thisMonth | last7Days
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc | date-asc | amount-desc | amount-asc

  // Filtered & Sorted Transactions
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);

    return transactions.filter((tx) => {
      // Type filter
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;

      // Period filter
      if (periodFilter === 'thisMonth') {
        if (!tx.date || !tx.date.startsWith(currentMonthPrefix)) return false;
      } else if (periodFilter === 'last7Days') {
        const txDate = new Date(tx.date);
        if (isNaN(txDate.getTime()) || txDate < sevenDaysAgo) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchNote = (tx.note || '').toLowerCase().includes(query);
        const matchCategory = (tx.category || '').toLowerCase().includes(query);
        if (!matchNote && !matchCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });
  }, [transactions, typeFilter, periodFilter, searchTerm, sortBy]);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-5 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Riwayat Transaksi</h2>
            <p className="text-xs text-slate-400">
              Menampilkan {filteredTransactions.length} dari {transactions.length} total transaksi
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari transaksi atau catatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Filter Badges & Sort Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Type Filters */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setTypeFilter('income')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'income' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pemasukan
            </button>
            <button
              onClick={() => setTypeFilter('expense')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'expense' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pengeluaran
            </button>
          </div>

          {/* Period & Sort Controls */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Period Selector */}
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              <option value="all">Semua Waktu</option>
              <option value="thisMonth">Bulan Ini</option>
              <option value="last7Days">7 Hari Terakhir</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              <option value="date-desc">Tanggal: Terbaru</option>
              <option value="date-asc">Tanggal: Terlama</option>
              <option value="amount-desc">Nominal: Terbesar</option>
              <option value="amount-asc">Nominal: Terkecil</option>
            </select>
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="divide-y divide-slate-100">
        {filteredTransactions.length === 0 ? (
          <div className="py-16 text-center px-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-700 mb-1">Tidak Ada Transaksi Ditemukan</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Tidak ada catatan transaksi yang cocok dengan kata kunci atau filter saat ini.
            </p>
            <button
              onClick={onAddNew}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              + Buat Catatan Pertama
            </button>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isIncome = tx.type === 'income';

            return (
              <div 
                key={tx.id} 
                className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4 group"
              >
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isIncome ? 'bg-emerald-100/70 text-emerald-600' : 'bg-rose-100/70 text-rose-600'
                  }`}>
                    {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm truncate">
                        {tx.category || 'Tanpa Kategori'}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isIncome ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 'bg-rose-50 text-rose-700 border border-rose-200/50'
                      }`}>
                        {isIncome ? 'Masuk' : 'Keluar'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{formatDateIndo(tx.date)}</span>
                      {tx.note && (
                        <>
                          <span>•</span>
                          <span className="text-slate-500 truncate max-w-[180px] sm:max-w-md" title={tx.note}>
                            {tx.note}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className={`font-bold text-sm sm:text-base ${
                      isIncome ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {isIncome ? '+' : '-'}{formatRupiah(tx.amount)}
                    </div>
                  </div>

                  {/* Action Buttons (Edit / Delete) */}
                  <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(tx)}
                      title="Edit transaksi"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus catatan transaksi ${tx.category} senilai ${formatRupiah(tx.amount)}?`)) {
                          onDelete(tx.id);
                        }
                      }}
                      title="Hapus transaksi"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
