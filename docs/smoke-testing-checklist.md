# Checklist Smoke Testing — Website Desa Makmurjaya

Dokumen ini berisi checklist verifikasi yang harus dilakukan setelah deployment pertama ke GitHub Pages. Tujuannya memastikan semua halaman dan fitur utama berfungsi dengan baik.

---

## Prasyarat

- Website sudah berhasil di-deploy ke GitHub Pages
- URL production sudah aktif (misal: `https://desamakmurjaya.id` atau `https://<username>.github.io/<repo>`)
- Browser modern (Chrome/Firefox/Edge versi terbaru)
- Koneksi internet aktif

---

## 1. Verifikasi Halaman Utama

Buka setiap halaman berikut dan pastikan tampil tanpa error (tidak ada halaman kosong atau error 404/500).

| No | Halaman | URL | Status |
|----|---------|-----|--------|
| 1.1 | Beranda | `/` | ☐ Pass / ☐ Fail |
| 1.2 | Profil — Sejarah | `/profil/sejarah` | ☐ Pass / ☐ Fail |
| 1.3 | Profil — Visi & Misi | `/profil/visi-misi` | ☐ Pass / ☐ Fail |
| 1.4 | Profil — Lokasi | `/profil/lokasi` | ☐ Pass / ☐ Fail |
| 1.5 | Pemerintahan | `/pemerintahan` | ☐ Pass / ☐ Fail |
| 1.6 | Berita | `/berita` | ☐ Pass / ☐ Fail |
| 1.7 | Pengumuman | `/pengumuman` | ☐ Pass / ☐ Fail |
| 1.8 | Wisata | `/wisata` | ☐ Pass / ☐ Fail |
| 1.9 | UMKM | `/umkm` | ☐ Pass / ☐ Fail |
| 1.10 | Galeri | `/galeri` | ☐ Pass / ☐ Fail |
| 1.11 | Kontak | `/kontak` | ☐ Pass / ☐ Fail |
| 1.12 | FAQ | `/faq` | ☐ Pass / ☐ Fail |
| 1.13 | Pencarian | `/search` | ☐ Pass / ☐ Fail |
| 1.14 | Halaman 404 | `/halaman-tidak-ada` (URL sembarang) | ☐ Pass / ☐ Fail |
| 1.15 | Admin CMS | `/admin` | ☐ Pass / ☐ Fail |

### Kriteria Lulus per Halaman

- Halaman termuat penuh tanpa error JavaScript di console
- Layout tampil sesuai (header, konten, footer terlihat)
- Tidak ada broken image (gambar placeholder boleh)
- Navigasi header dan footer terlihat dan bisa diklik

---

## 2. Verifikasi Hamburger Menu (Mobile)

### Langkah Pengujian

1. Buka website di browser desktop
2. Buka Developer Tools (F12)
3. Aktifkan mode responsive/device toolbar (Ctrl+Shift+M di Chrome)
4. Set lebar layar ke **< 768px** (misal: 375px × 667px — iPhone SE)
5. Pastikan tombol hamburger (ikon ☰) terlihat di header
6. **Klik tombol hamburger** — menu navigasi harus muncul/terbuka
7. Pastikan semua item menu terlihat (Beranda, Profil, Pemerintahan, Berita, Pengumuman, Wisata, UMKM, Galeri, Kontak, FAQ)
8. **Klik tombol hamburger lagi** — menu harus tertutup
9. **Klik salah satu item menu** — halaman tujuan harus termuat

### Verifikasi Aksesibilitas Hamburger

- Tombol hamburger memiliki atribut `aria-expanded` yang berubah antara `true`/`false`
- Tombol memiliki `aria-label` yang deskriptif (misal: "Buka menu navigasi")
- Menu dapat dibuka/ditutup dengan keyboard (Enter atau Space)
- Tekan Escape menutup menu

| Item Tes | Status |
|----------|--------|
| Hamburger muncul di viewport < 768px | ☐ Pass / ☐ Fail |
| Klik hamburger membuka menu | ☐ Pass / ☐ Fail |
| Klik hamburger lagi menutup menu | ☐ Pass / ☐ Fail |
| Semua item menu terlihat saat terbuka | ☐ Pass / ☐ Fail |
| Navigasi ke halaman lain berhasil | ☐ Pass / ☐ Fail |
| `aria-expanded` berubah sesuai state | ☐ Pass / ☐ Fail |
| Keyboard accessible (Enter/Space/Escape) | ☐ Pass / ☐ Fail |

---

## 3. Verifikasi Tombol Back to Top

### Langkah Pengujian

1. Buka halaman beranda (`/`)
2. Pastikan tombol "Back to Top" **tidak terlihat** saat halaman baru dimuat (scroll position = 0)
3. Scroll ke bawah lebih dari **300px**
4. Pastikan tombol "Back to Top" **muncul** di pojok kanan bawah layar
5. **Klik tombol** tersebut
6. Pastikan halaman scroll ke atas dengan smooth animation
7. Pastikan tombol **menghilang** setelah halaman kembali ke posisi atas (scrollY < 300)

### Verifikasi di Berbagai Halaman

Ulangi langkah di atas pada minimal 2 halaman berbeda (misal: `/berita`, `/faq`) untuk memastikan konsistensi.

| Item Tes | Status |
|----------|--------|
| Tombol tersembunyi saat scroll position < 300px | ☐ Pass / ☐ Fail |
| Tombol muncul setelah scroll > 300px | ☐ Pass / ☐ Fail |
| Klik tombol scroll ke atas (smooth) | ☐ Pass / ☐ Fail |
| Tombol hilang setelah kembali ke atas | ☐ Pass / ☐ Fail |
| Konsisten di halaman berbeda | ☐ Pass / ☐ Fail |

---

## 4. Verifikasi Halaman Admin (Decap CMS)

### Langkah Pengujian

1. Buka URL `/admin` di browser
2. Pastikan halaman Decap CMS termuat (bukan 404)
3. Pastikan muncul tampilan login atau antarmuka CMS
4. Pastikan **tidak ada error JavaScript** di console browser (F12 → Console)
5. Jika GitHub OAuth sudah dikonfigurasi: pastikan tombol login muncul dan redirect ke GitHub OAuth

| Item Tes | Status |
|----------|--------|
| `/admin` tidak menampilkan 404 | ☐ Pass / ☐ Fail |
| Halaman Decap CMS termuat | ☐ Pass / ☐ Fail |
| Tampilan login/antarmuka CMS terlihat | ☐ Pass / ☐ Fail |
| Tidak ada error JavaScript kritis | ☐ Pass / ☐ Fail |

---

## 5. Verifikasi Responsivitas Layout

Periksa tampilan website pada berbagai ukuran layar menggunakan Developer Tools:

### Breakpoint yang Diuji

| Perangkat | Lebar | Tinggi |
|-----------|-------|--------|
| Mobile kecil | 320px | 568px |
| Mobile standar | 375px | 667px |
| Tablet portrait | 768px | 1024px |
| Tablet landscape | 1024px | 768px |
| Desktop | 1280px | 800px |
| Desktop besar | 1920px | 1080px |

### Yang Diperiksa di Setiap Breakpoint

- [ ] Teks tidak terpotong atau overflow horizontal
- [ ] Gambar menyesuaikan ukuran container (tidak overflow)
- [ ] Navigasi sesuai (hamburger di mobile, horizontal di desktop)
- [ ] Konten tidak terlalu lebar atau sempit
- [ ] Footer tetap di bawah halaman
- [ ] Tombol dan tautan mudah diklik (area sentuh ≥ 44x44px di mobile)
- [ ] Font terbaca (minimal 16px di mobile)

| Breakpoint | Status |
|------------|--------|
| Mobile kecil (320px) | ☐ Pass / ☐ Fail |
| Mobile standar (375px) | ☐ Pass / ☐ Fail |
| Tablet portrait (768px) | ☐ Pass / ☐ Fail |
| Tablet landscape (1024px) | ☐ Pass / ☐ Fail |
| Desktop (1280px) | ☐ Pass / ☐ Fail |
| Desktop besar (1920px) | ☐ Pass / ☐ Fail |

---

## 6. Verifikasi Fitur Pencarian

### Langkah Pengujian

1. Buka halaman `/search`
2. Ketik kata kunci di kolom pencarian (misal: "desa" atau "berita")
3. Pastikan hasil pencarian muncul (jika ada konten yang cocok)
4. Pastikan pesan "Tidak ditemukan hasil" muncul jika pencarian tidak cocok
5. Pastikan hasil pencarian menampilkan judul, cuplikan, dan tautan

| Item Tes | Status |
|----------|--------|
| Halaman search termuat | ☐ Pass / ☐ Fail |
| Input pencarian berfungsi | ☐ Pass / ☐ Fail |
| Hasil ditampilkan dengan benar | ☐ Pass / ☐ Fail |
| Pesan kosong muncul saat tidak ada hasil | ☐ Pass / ☐ Fail |

---

## 7. Verifikasi Tambahan

| Item Tes | Status |
|----------|--------|
| robots.txt dapat diakses di `/robots.txt` | ☐ Pass / ☐ Fail |
| Sitemap.xml ter-generate di `/sitemap-index.xml` | ☐ Pass / ☐ Fail |
| Meta title dan description unik per halaman | ☐ Pass / ☐ Fail |
| Favicon/ikon website tampil di tab browser | ☐ Pass / ☐ Fail |
| HTTPS aktif (gembok hijau di address bar) | ☐ Pass / ☐ Fail |

---

## Ringkasan Hasil Pengujian

| Kategori | Jumlah Item | Lulus | Gagal | Catatan |
|----------|-------------|-------|-------|---------|
| Halaman Utama (Section 1) | 15 | | | |
| Hamburger Menu (Section 2) | 7 | | | |
| Back to Top (Section 3) | 5 | | | |
| Admin CMS (Section 4) | 4 | | | |
| Responsivitas (Section 5) | 6 | | | |
| Pencarian (Section 6) | 4 | | | |
| Verifikasi Tambahan (Section 7) | 5 | | | |
| **TOTAL** | **46** | | | |

---

## Penguji

- **Nama**: ___________________________
- **Tanggal Pengujian**: ___________________________
- **Browser**: ___________________________
- **Versi Browser**: ___________________________
- **Sistem Operasi**: ___________________________

---

## Catatan & Temuan

_Tuliskan temuan, bug, atau catatan penting di sini:_

1. ___________________________
2. ___________________________
3. ___________________________

---

## Tindak Lanjut

Jika ditemukan item yang gagal:
1. Dokumentasikan langkah reproduksi bug
2. Buat issue di GitHub repository
3. Perbaiki dan deploy ulang
4. Ulangi smoke test pada item yang gagal
