import { useState, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, DEFAULT_INCOME_CATEGORIES, DEFAULT_EXPENSE_CATEGORIES } from '../utils/constants';

const STORAGE_KEY_TX = 'finance_tracker_transactions_v1';
const STORAGE_KEY_CAT_INCOME = 'finance_tracker_cat_income';
const STORAGE_KEY_CAT_EXPENSE = 'finance_tracker_cat_expense';

export function useFinance() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TX);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse transactions from localStorage', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  const [incomeCategories, setIncomeCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CAT_INCOME);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_INCOME_CATEGORIES;
  });

  const [expenseCategories, setExpenseCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CAT_EXPENSE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_EXPENSE_CATEGORIES;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CAT_INCOME, JSON.stringify(incomeCategories));
    } catch (e) {
      console.error(e);
    }
  }, [incomeCategories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CAT_EXPENSE, JSON.stringify(expenseCategories));
    } catch (e) {
      console.error(e);
    }
  }, [expenseCategories]);

  // CRUD Operations
  const addTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const updateTransaction = (id, updatedFields) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedFields } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const resetData = () => {
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY_TX);
  };

  const resetToSampleData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(INITIAL_TRANSACTIONS));
  };

  // Export JSON
  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dompetku_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ['ID', 'Tipe', 'Kategori', 'Nominal', 'Tanggal', 'Catatan'];
    const rows = transactions.map((t) => [
      t.id,
      t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
      `"${(t.category || '').replace(/"/g, '""')}"`,
      t.amount,
      t.date,
      `"${(t.note || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dompetku_transaksi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Import JSON
  const importJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        throw new Error('Format file tidak valid, data harus berupa array');
      }
      // Validasi struktur minimal
      const validTxs = parsed.filter(t => t.id && t.type && typeof t.amount === 'number');
      if (validTxs.length === 0) {
        throw new Error('Tidak ada data transaksi valid yang ditemukan');
      }
      setTransactions(validTxs);
      return { success: true, count: validTxs.length };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Calculated Stats
  const stats = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const currentMonthPrefix = `${currentYear}-${currentMonth}`;

    let totalIncome = 0;
    let totalExpense = 0;
    let thisMonthIncome = 0;
    let thisMonthExpense = 0;

    const expenseCategoryMap = {};
    const incomeCategoryMap = {};
    const monthlyMap = {}; // 'YYYY-MM': { income, expense, label }

    transactions.forEach((tx) => {
      const amount = Number(tx.amount) || 0;
      const txMonth = (tx.date || '').substring(0, 7);

      if (!monthlyMap[txMonth] && txMonth) {
        const [y, m] = txMonth.split('-');
        const monthDate = new Date(Number(y), Number(m) - 1, 1);
        const label = isNaN(monthDate.getTime()) ? txMonth : new Intl.DateTimeFormat('id-ID', { month: 'short', year: '2-digit' }).format(monthDate);
        monthlyMap[txMonth] = { income: 0, expense: 0, label, sortKey: txMonth };
      }

      if (tx.type === 'income') {
        totalIncome += amount;
        if (tx.date && tx.date.startsWith(currentMonthPrefix)) {
          thisMonthIncome += amount;
        }
        incomeCategoryMap[tx.category] = (incomeCategoryMap[tx.category] || 0) + amount;
        if (txMonth && monthlyMap[txMonth]) monthlyMap[txMonth].income += amount;
      } else {
        totalExpense += amount;
        if (tx.date && tx.date.startsWith(currentMonthPrefix)) {
          thisMonthExpense += amount;
        }
        expenseCategoryMap[tx.category] = (expenseCategoryMap[tx.category] || 0) + amount;
        if (txMonth && monthlyMap[txMonth]) monthlyMap[txMonth].expense += amount;
      }
    });

    const balance = totalIncome - totalExpense;
    const thisMonthBalance = thisMonthIncome - thisMonthExpense;
    const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100)) : 0;

    // Sort category breakdown
    const categoryBreakdown = Object.entries(expenseCategoryMap)
      .map(([category, amount]) => {
        const catInfo = DEFAULT_EXPENSE_CATEGORIES.find(c => c.name === category);
        return {
          category,
          amount,
          percentage: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0,
          color: catInfo ? catInfo.color : '#64748b',
        };
      })
      .sort((a, b) => b.amount - a.amount);

    // Monthly sorted by recent
    const monthlyHistory = Object.values(monthlyMap)
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .slice(-6); // last 6 months

    return {
      totalIncome,
      totalExpense,
      balance,
      thisMonthIncome,
      thisMonthExpense,
      thisMonthBalance,
      savingsRate,
      categoryBreakdown,
      monthlyHistory,
      totalTransactions: transactions.length,
    };
  }, [transactions]);

  return {
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
  };
}
