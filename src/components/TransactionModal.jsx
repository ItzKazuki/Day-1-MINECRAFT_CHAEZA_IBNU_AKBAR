import React, { useState, useEffect } from 'react';
import { X, ArrowDownRight, ArrowUpRight, Calendar, Tag, FileText, CheckCircle2 } from 'lucide-react';
import { formatRupiah, getTodayString, generateId } from '../utils/formatters';

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  incomeCategories, 
  expenseCategories 
}) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(getTodayString());
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  // Reset or initialize form when opening
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type || 'expense');
        setAmount(initialData.amount ? String(initialData.amount) : '');
        setCategory(initialData.category || '');
        setDate(initialData.date || getTodayString());
        setNote(initialData.note || '');
      } else {
        setType('expense');
        setAmount('');
        const defaultCats = expenseCategories;
        setCategory(defaultCats[0]?.name || '');
        setDate(getTodayString());
        setNote('');
      }
      setError('');
    }
  }, [isOpen, initialData, expenseCategories]);

  // When type changes and category is empty or mismatched, auto-select first category
  const handleTypeChange = (newType) => {
    setType(newType);
    const activeCats = newType === 'income' ? incomeCategories : expenseCategories;
    setCategory(activeCats[0]?.name || '');
  };

  const handleQuickAddAmount = (addValue) => {
    const current = Number(amount) || 0;
    setAmount(String(current + addValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      setError('Masukkan jumlah nominal yang valid dan lebih besar dari 0');
      return;
    }

    if (!category.trim()) {
      setError('Silakan pilih salah satu kategori');
      return;
    }

    if (!date) {
      setError('Tanggal transaksi wajib diisi');
      return;
    }

    const payload = {
      id: initialData ? initialData.id : generateId(),
      type,
      amount: parsedAmount,
      category,
      date,
      note: note.trim(),
      createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
    };

    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  const currentCategories = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {initialData ? 'Edit Transaksi' : 'Catat Transaksi Baru'}
            </h3>
            <p className="text-xs text-slate-500">Kelola catatan kas masuk & kas keluar</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              {error}
            </div>
          )}

          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                type === 'expense'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowDownRight className="w-4 h-4" />
              Pengeluaran
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                type === 'income'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              Pemasukan
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nominal (Rp) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                Rp
              </span>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-base"
                autoFocus
              />
            </div>
            {/* Amount preview formatted */}
            {amount && !isNaN(Number(amount)) && (
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Terbaca: <span className="text-slate-900 font-bold">{formatRupiah(Number(amount))}</span>
              </p>
            )}

            {/* Quick amount chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[50000, 100000, 250000, 500000, 1000000].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleQuickAddAmount(val)}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-semibold text-slate-700 transition-colors"
                >
                  +{val >= 1000000 ? `${val / 1000000}jt` : `${val / 1000}rb`}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Pilih Kategori <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
              {currentCategories.map((cat) => {
                const isSelected = category === cat.name;
                return (
                  <button
                    type="button"
                    key={cat.id || cat.name}
                    onClick={() => {
                      setCategory(cat.name);
                      setError('');
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200/80 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: isSelected ? '#34d399' : cat.color || '#94a3b8' }} 
                    />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Tanggal Transaksi <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Catatan / Deskripsi (Opsional)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Makan siang dengan teman kantor, tagihan listrik PLN, dll"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              {initialData ? 'Simpan Perubahan' : 'Tambahkan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
