import React, { useState } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FinancialCharts from './components/FinancialCharts';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import { useFinance } from './hooks/useFinance';
import { Plus, CheckCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const {
    transactions,
    incomeCategories,
    expenseCategories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetData,
    resetToSampleData,
    exportJSON,
    exportCSV,
    importJSON,
    stats,
  } = useFinance();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tx) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (txData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, txData);
      showToast('Transaksi berhasil diperbarui!');
    } else {
      addTransaction(txData);
      showToast('Transaksi baru berhasil ditambahkan!');
    }
  };

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id);
    showToast('Transaksi berhasil dihapus');
  };

  const handleResetData = () => {
    resetData();
    showToast('Semua data berhasil dibersihkan');
  };

  const handleResetSample = () => {
    resetToSampleData();
    showToast('Data simulasi contoh berhasil dimuat!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        onOpenAddModal={handleOpenAddModal}
        onExportCSV={exportCSV}
        onExportJSON={exportJSON}
        onImportJSON={importJSON}
        onResetData={handleResetData}
        onResetSample={handleResetSample}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Statistic Cards */}
        <SummaryCards stats={stats} />

        {/* Analytics Charts */}
        <FinancialCharts stats={stats} />

        {/* Transaction History & Filter */}
        <TransactionList
          transactions={transactions}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTransaction}
          onAddNew={handleOpenAddModal}
        />
      </main>

      {/* Modal Add / Edit */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        initialData={editingTransaction}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
      />

      {/* Floating Action Button for Mobile */}
      <div className="sm:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenAddModal}
          className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 hover:bg-emerald-700 active:scale-95 transition-all"
          title="Tambah Transaksi"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Semua data tersimpan aman di <strong>Browser LocalStorage</strong> Anda (Privat & Tanpa Database).</span>
          </div>
          <div>
            <span>DompetKu © {new Date().getFullYear()} • Personal Finance Tracker</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
