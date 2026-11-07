# Introduction
Perkenalkan nama saya Chaeza Ibnu Akbar dari kelas TI 1A Angkatan 2026.

Repository ini merupakan salah satu task submission di dalam [website gultik](https://himatikpnj.com/expectik/day-1-proyek-workshop-26-w1-2026).

Tujuan dari adanya repository ini agar manajemen 

Dalam prompting engineering ai membutuhkan banyak context jika kita tidak memberikan konteks yang benar ai akan membuat konteks sendiri dan juga menyebabkan terjadinya keliruan dan yang diharapkan pengguna tidak masuk ke dalam output dari AI tersebut, atau bahkan sampai AI melantur sendiri menyebabkan output yang diharapkan penguna melenceng jauh.


## Git & Github
Git merupakan version control System yang digunakan developer untuk mengontrol versi kode di local device.

Github merupakan version control system namun berjalan di internet, semua kode dan juga history 


---

## 💰 Proyek Web: DompetKu (Personal Expense & Income Tracker)

Aplikasi web pelacak pemasukan dan pengeluaran berbasis **React.js + Tailwind CSS** tanpa database eksternal — semua data disimpan secara privat dan instan di **Browser LocalStorage**.

### ✨ Fitur Utama
1. **Ringkasan Finansial Realtime**:
   - Saldo bersih (Pemasukan - Pengeluaran) dengan fitur sembunyikan nominal (*Privacy Eye*).
   - Total Pemasukan & Pengeluaran (keseluruhan & bulan berjalan).
   - Rasio & indikator kesehatan tabungan.
2. **Visualisasi & Diagram Interaktif**:
   - **Donut Chart**: Proporsi pengeluaran berdasarkan kategori.
   - **Bar Chart**: Perbandingan arus kas bulanan (Pemasukan vs Pengeluaran).
3. **Manajemen Transaksi Lengkap (CRUD)**:
   - Tambah transaksi baru dengan format mata uang otomatis (Rupiah Rp) dan quick amount chips (+50rb, +100rb, dll).
   - Edit transaksi yang sudah ada.
   - Hapus transaksi dengan konfirmasi pengamanan.
4. **Filter & Pencarian**:
   - Filter tipe (Semua, Pemasukan, Pengeluaran).
   - Filter rentang waktu (Semua Waktu, Bulan Ini, 7 Hari Terakhir).
   - Urutkan berdasarkan tanggal (terbaru/terlama) atau nominal (terbesar/terkecil).
   - Pencarian real-time pada catatan atau kategori.
5. **Backup & Portabilitas Data**:
   - **Export CSV / Excel**: Unduh riwayat laporan keuangan dalam format `.csv`.
   - **Backup JSON**: Unduh data transaksi lengkap dalam format `.json`.
   - **Restore / Import JSON**: Unggah file backup JSON untuk mengembalikan data kapan saja.
   - **Reset / Sample Data**: Fitur coba data simulasi atau bersihkan memori lokal.

### 🚀 Cara Menjalankan Proyek

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka browser di URL yang tertera (biasanya `http://localhost:5173`).

2. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
   File hasil build siap didistribusikan di folder `dist/`.
