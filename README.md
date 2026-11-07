# Introduction
Perkenalkan nama saya Chaeza Ibnu Akbar dari kelas TI 1A Angkatan 2026.

Repository ini merupakan salah satu task submission di dalam [website gultik](https://himatikpnj.com/expectik/day-1-proyek-workshop-26-w1-2026).

Tujuan dari adanya repository ini agar manajemen versi kode, dokumentasi proyek, serta hasil pembelajaran mengenai *Prompt Engineering*, Git, dan GitHub dapat tersimpan secara terstruktur, terlacak, dan mudah dikolaborasikan.

Dalam *prompt engineering*, AI/LLM membutuhkan banyak konteks yang jelas dan spesifik. Jika kita tidak memberikan konteks yang benar, AI akan membuat asumsi atau konteks sendiri yang menyebabkan terjadinya kekeliruan. Akibatnya, hasil yang diharapkan pengguna tidak muncul dalam *output* AI, atau bahkan AI dapat mengalami "halusinasi" (*melantur*) sehingga *output* yang dihasilkan melenceng jauh dari tujuan awal.

---

## 1. Prompt Engineering

*Prompt engineering* adalah proses memberikan instruksi, arahan, dan konteks tambahan secara eksplisit ke dalam *prompt* agar model AI dapat memahami tujuan pengguna secara akurat dan menghasilkan luaran yang presisi.

### Prinsip Utama: Proses Iteratif
*Prompting* bukanlah proses satu kali selesai (*one-shot*). Hasil yang sempurna jarang didapatkan hanya dari satu kali mencoba. Oleh karena itu, pengguna perlu melakukan iterasi (penyesuaian *prompt* secara berulang) agar model AI semakin memahami batasan dan kebutuhan spesifik proyek.

### Manfaat Utama Prompt Engineering
1. **Meningkatkan Performa Model AI**: Model AI tidak secara otomatis membagikan atau mengingat seluruh riwayat konteks tanpa arahan. Konteks yang kaya membantu AI memberikan jawaban yang lebih relevan dan mendalam.
2. **Mengurangi Respon yang Tidak Relevan atau Ofensif**: Menetapkan batasan secara eksplisit (*explicit boundaries*) dalam konteks mencegah AI menghasilkan jawaban yang menyimpang atau tidak diinginkan.
3. **Meningkatkan Kontrol dan Kepastian (*Predictability*)**: Dengan memberikan arahan dan batasan yang jelas, pengguna memiliki kendali penuh atas struktur dan format *output* yang dihasilkan AI.
4. **Memberikan Pengalaman Pengguna yang Lebih Baik**: Mengurangi rasa frustrasi saat berinteraksi dengan AI karena *output* yang dihasilkan langsung sesuai dengan ekspektasi.

---

## 2. Git & GitHub

### Definisi Git
Git merupakan *Version Control System* (VCS) terdistribusi yang berjalan di perangkat lokal (*local device*). Git diciptakan oleh Linus Torvalds pada tahun 2005. Fungsi utama Git adalah meracak siapa, kapan, dan perubahan apa saja yang dilakukan terhadap setiap file di dalam repositori proyek.

### Definisi GitHub
GitHub merupakan platform berbasis *cloud* (server internet) yang digunakan untuk menyimpan repositori Git secara daring. Jika Git beroperasi di komputer lokal untuk mengelola riwayat versi, maka GitHub berfungsi sebagai media penyimpanan terpusat agar seluruh riwayat *commit* dan kode dapat diunggah, diakses, serta dikolaborasikan bersama tim dari mana saja.

---

## 3. Tiga Area Kerja Utama di Git (*Working Areas*)

Dalam alur kerja Git lokal, terdapat tiga area kerja utama yang perlu dipahami:

| Area Kerja | Deskripsi & Fungsi |
| :--- | :--- |
| **Working Directory** | Area lokal di komputer tempat pengguna membuat, menambah, atau mengubah file proyek. |
| **Staging Area** | Penampungan sementara untuk menyeleksi dan menandai perubahan file (menggunakan `git add`) sebelum disimpan secara permanen. |
| **Git Repository (Directory)** | Penyimpanan permanen di database Git lokal yang menyimpan seluruh riwayat perubahan setelah diikat dengan perintah `git commit`. |

---

## 4. Perintah Dasar & Alur Kerja Git/GitHub

### A. Perintah Dasar Git Lokal
* **`git init`**: Menginisialisasi folder biasa menjadi repositori Git lokal agar perubahan di dalamnya dapat dilacak.
* **`git status`**: Memeriksa status pelacakan file (melihat file mana yang belum dilacak, baru diubah, atau sudah ada di *staging area*).
* **`git add .` / `git add -A`**: Memindahkan seluruh perubahan file dari *working directory* ke *staging area*.
* **`git commit -m "pesan commit"`**: Menyimpan permanen perubahan dari *staging area* ke dalam repositori lokal disertai pesan penjelasan.
* **`git config --global user.name "Nama"` & `user.email "email@example.com"`**: Mengatur identitas pembuat *commit* secara global di sistem lokal.

### B. Perintah Remote & Sinkronisasi GitHub
* **`git remote add origin <URL_REPOSITORY>`**: Menghubungkan repositori Git lokal dengan repositori *remote* di GitHub.
* **`git push origin main`**: Mengunggah (*upload*) hasil *commit* dari repositori lokal ke cabang (*branch*) `main` di GitHub.
* **`git pull`**: Menarik (*download*) dan menggabungkan perubahan kode terbaru dari repositori GitHub ke komputer lokal untuk menjaga keterbaruan proyek tim.

---

## 5. Konfigurasi Koneksi Aman Menggunakan SSH

Untuk menghubungkan komputer lokal ke akun GitHub secara aman tanpa perlu memasukkan kata sandi atau token setiap kali melakukan *push*, digunakan kuncian SSH (*Secure Shell*):

1. **Membuat Pasangan Kunci SSH (Algorithm ED25519)**:
   ```bash
   ssh-keygen -t ed25519 -C "email_github_anda@example.com"
   ```
2. **Menjalankan SSH Agent**:
   ```bash
   eval "\$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```
3. **Menambahkan Kunci Publik ke GitHub**:
   Buka file kunci publik (`cat ~/.ssh/id_ed25519.pub`), salin seluruh kodenya, lalu tempelkan (*paste*) pada menu **Settings > SSH and GPG keys** di akun GitHub.
4. **Verifikasi Koneksi**:
   ```bash
   ssh -T git@github.com
   ```
   Jika berhasil, akan muncul pesan sambutan yang menyatakan autentikasi ke akun GitHub telah berhasil.

---

## 6. Ringkasan Praktik Workshop & Integrasi AI

Dalam sesi praktik workshop:
* **Pengembangan Aplikasi**: Peserta memanfaatkan kode editor **VS Code** yang diintegrasikan dengan asisten AI (seperti platform *Anti Gravity* / ChatGPT) untuk merancang dan membangun proyek aplikasi sederhana (contohnya *Student Planner* yang *mobile-friendly*).
* **Manajemen Kode Terintegrasi**: Dengan memanfaatkan *prompt engineering* untuk membuat komponen aplikasi, hasil kodenya langsung dilacak menggunakan Git (`git init`, `git add`, `git commit`), lalu dihubungkan dan diunggah ke repositori GitHub via `git push`.
* **Hasil Akhir**: Kombinasi antara alur kerja *Prompt Engineering* yang efektif dan penguasaan *Version Control System* (Git & GitHub) memungkinkan pengembangan perangkat lunak menjadi lebih cepat, terstruktur, dan siap untuk dikolaborasikan.
