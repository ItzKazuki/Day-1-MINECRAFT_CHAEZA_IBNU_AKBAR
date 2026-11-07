export const DEFAULT_INCOME_CATEGORIES = [
  { id: 'gaji', name: 'Gaji Pokok', color: '#10b981', icon: 'Briefcase' },
  { id: 'freelance', name: 'Freelance & Side Project', color: '#06b6d4', icon: 'Laptop' },
  { id: 'investasi', name: 'Investasi & Dividen', color: '#6366f1', icon: 'TrendingUp' },
  { id: 'bonus', name: 'Bonus & THR', color: '#f59e0b', icon: 'Gift' },
  { id: 'lainnya_income', name: 'Pemasukan Lainnya', color: '#8b5cf6', icon: 'Coins' },
];

export const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'makanan', name: 'Makanan & Minuman', color: '#ef4444', icon: 'Utensils' },
  { id: 'transportasi', name: 'Transportasi & Bensin', color: '#f97316', icon: 'Car' },
  { id: 'belanja', name: 'Belanja & Kebutuhan', color: '#ec4899', icon: 'ShoppingBag' },
  { id: 'tagihan', name: 'Tagihan & Utilitas', color: '#3b82f6', icon: 'Zap' },
  { id: 'hiburan', name: 'Hiburan & Liburan', color: '#8b5cf6', icon: 'Film' },
  { id: 'kesehatan', name: 'Kesehatan & Medis', color: '#14b8a6', icon: 'HeartPulse' },
  { id: 'pendidikan', name: 'Edukasi & Buku', color: '#0ea5e9', icon: 'GraduationCap' },
  { id: 'lainnya_expense', name: 'Pengeluaran Lainnya', color: '#64748b', icon: 'MoreHorizontal' },
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx_init_1',
    type: 'income',
    amount: 8500000,
    category: 'Gaji Pokok',
    date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    note: 'Gaji bulanan kantor',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'tx_init_2',
    type: 'expense',
    amount: 850000,
    category: 'Belanja & Kebutuhan',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    note: 'Belanja bulanan supermarket',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'tx_init_3',
    type: 'expense',
    amount: 120000,
    category: 'Makanan & Minuman',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    note: 'Makan siang bareng teman',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'tx_init_4',
    type: 'income',
    amount: 1500000,
    category: 'Freelance & Side Project',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    note: 'Proyek landing page client',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'tx_init_5',
    type: 'expense',
    amount: 350000,
    category: 'Tagihan & Utilitas',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    note: 'Internet WiFi rumah',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];
