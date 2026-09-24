KAREL — PORTOFOLIO WEBSITE
===========================

ISI PAKET
- index.html      → Halaman Beranda
- about.html       → Halaman Tentang (bio, layanan, keahlian, proses kerja)
- projects.html     → Halaman Proyek (bisa tambah/hapus data proyek)
- contact.html       → Halaman Kontak (form + testimoni)
- assets/style.css  → Semua styling
- assets/common.js  → Logika interaktif (proyek, testimoni, form, dll)
- assets/hero3d.js  → Animasi 3D di halaman Beranda

CARA INSTALL / PAKAI
1. Cara paling cepat (lokal):
   Ekstrak folder ini, lalu buka file index.html langsung di browser (double click).

2. Upload ke hosting (cPanel, Netlify, Vercel, GitHub Pages, dll):
   Upload SELURUH folder ini (termasuk folder assets) ke root direktori hosting kamu.
   Pastikan struktur foldernya tetap sama persis — jangan pisahkan assets/ dari file html.

3. Custom domain:
   Setelah upload, arahkan domain kamu ke folder tempat index.html berada.

EDIT KONTEN
- Ganti nama, email, dan link sosial: cari & ganti teks "Karel", "halo@karel.dev" di tiap file .html
- Ganti warna: buka assets/style.css, ubah variabel di bagian ":root" (--bg, --lime, --violet, dst)
- Data proyek yang ditambahkan lewat tombol "+ Tambah Proyek" tersimpan di browser pengunjung (localStorage),
  jadi tiap pengunjung punya datanya sendiri-sendiri — bukan database bersama.

CATATAN
Website ini murni HTML/CSS/JS statis — tidak perlu server backend atau database untuk berjalan.

FORM KONTAK → OTOMATIS MASUK GMAIL
Form di contact.html sudah disambungkan ke layanan gratis FormSubmit.co, terarah ke:
  karelunedosiringoringo2@gmail.com

Langkah aktivasi (WAJIB, hanya sekali):
1. Upload/buka website ini (harus lewat http/https, bukan cuma dibuka dari file lokal, atau FormSubmit tidak akan berjalan).
2. Isi form kontak sekali dan klik "Kirim Pesan".
3. FormSubmit akan mengirim email konfirmasi ke karelunedosiringoringo2@gmail.com berisi tombol
   "Activate Form" — klik tombol itu sekali saja.
4. Setelah aktif, SETIAP pesan yang dikirim lewat form kontak akan otomatis masuk ke inbox Gmail
   tersebut, lengkap dengan nama, email, dan pesan pengirim.
5. Setelah submit berhasil, pengunjung otomatis diarahkan ke halaman thanks.html.

Tidak perlu API key, tidak perlu server tambahan — semuanya ditangani oleh FormSubmit secara gratis.

