import React, { useState, useRef } from 'react';
import { 
  Wallet, 
  PlusCircle, 
  Download, 
  Upload, 
  RotateCcw, 
  FileSpreadsheet, 
  FileCode,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  onOpenAddModal, 
  onExportCSV, 
  onExportJSON, 
  onImportJSON, 
  onResetData,
  onResetSample
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = onImportJSON(content);
        if (result.success) {
          alert(`Berhasil mengimpor ${result.count} transaksi!`);
        } else {
          alert(`Gagal mengimpor: ${result.message}`);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset input
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">DompetKu</h1>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                LocalStorage
              </span>
            </div>
            <p className="text-xs text-slate-500">Pencatat Keuangan Pemasukan & Pengeluaran</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Hidden File Input for Import */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            className="hidden" 
          />

          {/* Import Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import Backup JSON"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Import</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              title="Unduh Laporan Keuangan"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {showExportMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-20 text-xs">
                  <button
                    onClick={() => {
                      onExportCSV();
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    Unduh File Excel (CSV)
                  </button>
                  <button
                    onClick={() => {
                      onExportJSON();
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                  >
                    <FileCode className="w-4 h-4 text-blue-600" />
                    Backup File (JSON)
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sample Data Button */}
          <button
            onClick={() => {
              if (confirm('Muat data contoh transaksi simulasi?')) {
                onResetSample();
              }
            }}
            title="Muat Data Contoh"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">Sample Data</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menghapus SEMUA transaksi di penyimpanan lokal?')) {
                onResetData();
              }
            }}
            title="Hapus Semua Data"
            className="p-2 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Action: Add Transaction */}
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-emerald-600/30 transition-all transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Catat Transaksi</span>
          </button>
        </div>
      </div>
    </header>
  );
}
