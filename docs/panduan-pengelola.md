# Panduan Pengelola Website Desa

## Pendahuluan

Selamat datang! Panduan ini ditujukan untuk pengelola website Desa Makmurjaya yang bertugas menambah, mengubah, atau menghapus konten di website desa.

Website desa menggunakan sistem kelola konten (CMS) bernama **Decap CMS**. Dengan CMS ini, Anda bisa mengelola berita, pengumuman, data UMKM, wisata, galeri foto, dan lainnya — langsung dari browser tanpa perlu memahami kode program.

**Yang Anda butuhkan:**
- Komputer atau laptop dengan koneksi internet
- Browser (Google Chrome, Firefox, atau Edge)
- Akun GitHub (akan dijelaskan di bagian login)

---

## Cara Login ke CMS

### Langkah 1: Buka Halaman Admin

Buka browser Anda, lalu ketik alamat website desa diikuti `/admin`. Contoh:

```
https://desa-makmurjaya.netlify.app/admin
```

### Langkah 2: Klik Tombol Login

Setelah halaman admin terbuka, Anda akan melihat tombol **"Login with GitHub"**. Klik tombol tersebut.

### Langkah 3: Masuk dengan Akun GitHub

Anda akan diarahkan ke halaman GitHub. Masukkan email dan kata sandi akun GitHub Anda, lalu klik **Sign in**.

Jika ini pertama kali Anda login, GitHub akan meminta izin akses. Klik **Authorize** untuk mengizinkan.

### Langkah 4: Mulai Mengelola Konten

Setelah berhasil login, Anda akan melihat dashboard CMS. Di sebelah kiri ada daftar menu konten yang bisa Anda kelola:

- Berita
- Pengumuman
- Destinasi Wisata
- UMKM
- Galeri Foto
- Perangkat Desa
- FAQ (Tanya Jawab)
- Halaman Statis

> **Catatan:** Jika Anda belum punya akun GitHub, minta bantuan admin IT desa untuk membuatkan akun terlebih dahulu.

---

## Cara Mengelola Berita

### Menambah Berita Baru

1. Di menu sebelah kiri, klik **"Berita"**
2. Klik tombol **"New Artikel Berita"** (atau "Buat Baru")
3. Isi data berita:
   - **Judul** — Judul artikel berita
   - **Slug URL** — Alamat singkat untuk berita ini (huruf kecil, pakai tanda hubung). Contoh: `pelatihan-kerajinan-tangan`
   - **Tanggal Publikasi** — Pilih tanggal berita diterbitkan
   - **Foto Thumbnail** — Upload foto utama untuk berita (opsional). Lihat [Panduan Upload Foto](#panduan-upload-foto) untuk ketentuan
   - **Cuplikan** — Tulis ringkasan singkat berita (maks 300 karakter)
   - **Penulis** — Nama penulis berita (opsional)
   - **Status** — Pilih `draft` (belum tayang) atau `published` (tayang di website)
   - **Isi Berita** — Tulis isi artikel lengkap di sini. Anda bisa menambahkan format tebal, miring, daftar, dan gambar

4. Klik tombol **"Publish"** (atau "Simpan") di pojok kanan atas

### Mengedit Berita

1. Klik **"Berita"** di menu sebelah kiri
2. Klik judul berita yang ingin Anda ubah
3. Ubah data yang perlu diperbaiki
4. Klik **"Publish"** untuk menyimpan perubahan

### Menghapus Berita

1. Klik **"Berita"** di menu sebelah kiri
2. Klik judul berita yang ingin dihapus
3. Cari tombol **"Delete"** (Hapus) — biasanya ada di bagian atas atau bawah halaman
4. Akan muncul **pertanyaan konfirmasi**: "Apakah Anda yakin ingin menghapus?" Klik **"OK"** atau **"Ya"** jika benar-benar ingin menghapus

> **Perhatian:** Berita yang sudah dihapus tidak bisa dikembalikan. Pastikan Anda sudah yakin sebelum menghapus.

### Tips Status Berita

- **Draft** = Berita tersimpan tapi belum muncul di website. Cocok untuk berita yang masih dalam proses penulisan.
- **Published** = Berita sudah tayang dan bisa dilihat pengunjung website.

---

## Cara Mengelola Pengumuman

### Menambah Pengumuman Baru

1. Di menu sebelah kiri, klik **"Pengumuman"**
2. Klik tombol **"Buat Baru"**
3. Isi data pengumuman:
   - **Judul** — Judul pengumuman
   - **Slug URL** — Alamat singkat. Contoh: `jadwal-posyandu-mei-2025`
   - **Kategori** — Pilih salah satu:
     - `pengumuman` — untuk informasi umum
     - `agenda` — untuk kegiatan yang punya tanggal pelaksanaan
   - **Tanggal Publikasi** — Tanggal pengumuman diterbitkan
   - **Tanggal Pelaksanaan** — Khusus untuk kategori Agenda. Isi tanggal acara akan dilaksanakan
   - **Waktu Pelaksanaan** — Contoh: `09.00 WIB`
   - **Cuplikan** — Ringkasan singkat (opsional)
   - **Status** — `draft` atau `published`
   - **Lampiran** — Jika ada file yang perlu dilampirkan (misalnya surat undangan), klik "Tambah" lalu upload file dan beri nama
   - **Isi Pengumuman** — Tulis isi pengumuman lengkap

4. Klik **"Publish"** untuk menyimpan

### Mengedit Pengumuman

1. Klik **"Pengumuman"** di menu
2. Klik pengumuman yang ingin diubah
3. Lakukan perubahan
4. Klik **"Publish"** untuk menyimpan

### Menghapus Pengumuman

1. Klik **"Pengumuman"** di menu
2. Klik pengumuman yang ingin dihapus
3. Klik tombol **"Delete"** (Hapus)
4. Konfirmasi penghapusan dengan klik **"OK"**

> **Perhatian:** Pengumuman yang sudah dihapus tidak bisa dikembalikan.

---

## Cara Mengelola UMKM

### Menambah Profil UMKM Baru

1. Di menu sebelah kiri, klik **"UMKM"**
2. Klik tombol **"Buat Baru"**
3. Isi data usaha:
   - **Nama Usaha** — Nama usaha/toko
   - **Slug URL** — Alamat singkat. Contoh: `keripik-singkong-bu-ani`
   - **Pemilik** — Nama pemilik usaha
   - **Kategori** — Jenis usaha. Contoh: Kerajinan, Kuliner, Pertanian, Jasa
   - **Jenis Produk** — Produk apa yang dijual
   - **Range Harga** — Kisaran harga produk. Contoh: `Rp 15.000 - Rp 50.000`
   - **Nomor WhatsApp** — Format: `628XXXXXXXXX` (tanpa spasi, tanpa tanda plus). Contoh: `6281234567890`
   - **Alamat** — Alamat lengkap usaha (opsional)
   - **Foto Utama** — Foto utama usaha/produk. Lihat [Panduan Upload Foto](#panduan-upload-foto)
   - **Galeri Produk** — Tambahkan beberapa foto produk (opsional)
   - **Status** — `draft` atau `published`
   - **Deskripsi Usaha** — Ceritakan tentang usaha ini secara lengkap

4. Klik **"Publish"** untuk menyimpan

### Mengedit UMKM

1. Klik **"UMKM"** di menu
2. Klik nama usaha yang ingin diubah
3. Ubah data yang diperlukan
4. Klik **"Publish"** untuk menyimpan

### Menghapus UMKM

1. Klik **"UMKM"** di menu
2. Klik nama usaha yang ingin dihapus
3. Klik tombol **"Delete"** (Hapus)
4. Konfirmasi penghapusan dengan klik **"OK"**

> **Perhatian:** Data UMKM yang sudah dihapus tidak bisa dikembalikan.

---

## Cara Mengelola Wisata

### Menambah Destinasi Wisata Baru

1. Di menu sebelah kiri, klik **"Destinasi Wisata"**
2. Klik tombol **"Buat Baru"**
3. Isi data wisata:
   - **Nama Destinasi** — Nama tempat wisata
   - **Slug URL** — Alamat singkat. Contoh: `air-terjun-curug-indah`
   - **Foto Utama** — Foto pemandangan/tempat wisata. Lihat [Panduan Upload Foto](#panduan-upload-foto)
   - **Deskripsi Singkat** — Gambaran singkat tentang tempat wisata
   - **Jam Operasional** — Contoh: `Senin-Minggu, 07.00-17.00 WIB`
   - **Harga Tiket** — Contoh: `Rp 10.000/orang` atau `Gratis`
   - **Kontak Narahubung** — Nomor yang bisa dihubungi
   - **Petunjuk Akses** — Cara menuju lokasi wisata
   - **Latitude Peta** dan **Longitude Peta** — Koordinat untuk penunjuk di peta (minta bantuan admin IT jika belum tahu caranya)
   - **Label Peta** — Nama yang muncul di peta
   - **Galeri Foto** — Tambahkan beberapa foto wisata (opsional)
   - **Status** — `draft` atau `published`
   - **Deskripsi Lengkap** — Tulis informasi lengkap tentang destinasi wisata

4. Klik **"Publish"** untuk menyimpan

### Mengedit Wisata

1. Klik **"Destinasi Wisata"** di menu
2. Klik nama wisata yang ingin diubah
3. Ubah data yang diperlukan
4. Klik **"Publish"** untuk menyimpan

### Menghapus Wisata

1. Klik **"Destinasi Wisata"** di menu
2. Klik nama wisata yang ingin dihapus
3. Klik tombol **"Delete"** (Hapus)
4. Konfirmasi penghapusan dengan klik **"OK"**

> **Perhatian:** Data wisata yang sudah dihapus tidak bisa dikembalikan.

---

## Cara Mengelola Galeri

### Menambah Foto ke Galeri

1. Di menu sebelah kiri, klik **"Galeri Foto"**
2. Klik tombol **"Buat Baru"**
3. Isi data foto:
   - **Judul Foto** — Beri judul untuk foto ini
   - **File Foto** — Upload file foto. Lihat [Panduan Upload Foto](#panduan-upload-foto) untuk ketentuan
   - **Caption** — Keterangan singkat tentang foto (opsional)
   - **Album/Kategori** — Ketik nama album untuk mengelompokkan foto. Contoh: `Kegiatan Desa`, `Pembangunan`, `Alam`, `Umum`
   - **Tanggal Upload** — Pilih tanggal
   - **Urutan** — Angka untuk menentukan urutan tampil (semakin kecil, semakin di depan)

4. Klik **"Publish"** untuk menyimpan

### Mengedit Foto di Galeri

1. Klik **"Galeri Foto"** di menu
2. Klik foto yang ingin diubah
3. Ubah judul, caption, album, atau ganti fotonya
4. Klik **"Publish"** untuk menyimpan

### Menghapus Foto dari Galeri

1. Klik **"Galeri Foto"** di menu
2. Klik foto yang ingin dihapus
3. Klik tombol **"Delete"** (Hapus)
4. Konfirmasi penghapusan dengan klik **"OK"**

### Tips Mengelola Galeri

- Gunakan nama album yang konsisten agar foto terkelompok dengan rapi
- Isi caption agar pengunjung tahu konteks foto tersebut
- Atur urutan jika ingin foto tertentu muncul lebih dulu

---

## Panduan Upload Foto

### Ketentuan Foto

| Ketentuan | Keterangan |
|-----------|-----------|
| **Format yang diterima** | JPG, PNG, WebP |
| **Ukuran maksimal** | 5 MB per foto |
| **Dimensi yang disarankan** | Lebar minimal 800 piksel |

### Tips Mempersiapkan Foto

1. **Cek ukuran file** — Klik kanan file foto di komputer Anda, pilih "Properties" (Properti). Pastikan ukurannya di bawah 5 MB.

2. **Jika foto terlalu besar** — Anda bisa mengecilkan ukuran foto dengan cara:
   - Buka foto di aplikasi **Paint** (bawaan Windows)
   - Klik menu **Resize** (Ubah Ukuran)
   - Kurangi persentasenya, misalnya ke 50%
   - Simpan ulang (File > Save As > pilih format JPEG)

3. **Format yang direkomendasikan:**
   - **JPG** — Paling umum untuk foto, ukuran file lebih kecil
   - **PNG** — Cocok untuk gambar dengan teks atau logo (kualitas tinggi tapi ukuran lebih besar)
   - **WebP** — Format modern, ukuran paling kecil dengan kualitas tetap bagus

4. **Jangan upload foto yang:**
   - Buram atau terlalu gelap
   - Ukurannya sangat kecil (di bawah 200 piksel) karena akan terlihat pecah di website
   - Mengandung informasi pribadi yang tidak seharusnya dipublikasikan

### Cara Upload Foto di CMS

1. Pada kolom foto (misalnya "Foto Thumbnail" atau "Foto Utama"), klik tombol **"Choose an image"** atau **"Pilih Gambar"**
2. Klik **"Upload"** lalu pilih file foto dari komputer Anda
3. Tunggu proses upload selesai (tergantung ukuran file dan kecepatan internet)
4. Setelah selesai, foto akan muncul sebagai preview di formulir

> **Jika muncul error saat upload:** Pastikan ukuran foto di bawah 5 MB dan formatnya JPG, PNG, atau WebP.

---

## FAQ — Masalah Umum dan Solusinya

### 1. Saya tidak bisa login ke CMS

**Kemungkinan penyebab dan solusi:**

- **Belum punya akun GitHub** — Hubungi admin IT desa untuk dibuatkan akun
- **Lupa password GitHub** — Buka [github.com](https://github.com), klik "Forgot password" dan ikuti langkah reset password
- **Muncul pesan error saat login** — Coba bersihkan cache browser: tekan `Ctrl + Shift + Delete`, centang "Cached images and files", lalu klik "Clear data". Setelah itu coba login lagi
- **Tombol login tidak muncul** — Pastikan alamat yang diketik benar (harus diakhiri `/admin`)

### 2. Foto gagal diupload

**Kemungkinan penyebab dan solusi:**

- **File terlalu besar** — Ukuran foto harus di bawah 5 MB. Kecilkan ukurannya terlebih dahulu (lihat [Panduan Upload Foto](#panduan-upload-foto))
- **Format tidak didukung** — Pastikan foto berformat JPG, PNG, atau WebP. Format lain seperti BMP, TIFF, atau HEIC tidak didukung
- **Koneksi internet lambat** — Tunggu beberapa saat lalu coba upload ulang. Jika tetap gagal, coba pakai koneksi internet yang lebih stabil

### 3. Perubahan yang saya simpan belum muncul di website

**Ini normal!** Setelah Anda menyimpan perubahan di CMS, website memerlukan waktu **1-3 menit** untuk memperbarui tampilan. Ini karena website perlu memproses (build) ulang halamannya.

**Yang bisa Anda lakukan:**
- Tunggu sekitar 3 menit
- Buka kembali halaman website
- Tekan `Ctrl + F5` untuk memaksa browser memuat ulang halaman (bukan dari cache)

Jika setelah 5 menit perubahan masih belum muncul, hubungi admin IT desa.

### 4. Saya tidak sengaja menghapus konten — bisa dikembalikan?

Sayangnya, konten yang sudah dihapus melalui CMS **tidak bisa langsung dikembalikan**. Namun, admin IT mungkin bisa mengembalikannya melalui riwayat versi di GitHub.

**Tips pencegahan:**
- Selalu baca konfirmasi sebelum klik "OK" pada dialog hapus
- Jika ragu, ubah status menjadi "draft" daripada menghapus — konten draft tidak muncul di website tapi datanya tetap tersimpan

### 5. Tulisan di CMS terlihat aneh (ada tanda bintang, tanda pagar, dll)

CMS menggunakan format penulisan yang disebut **Markdown**. Beberapa tanda yang umum:

| Tanda | Artinya |
|-------|---------|
| `**teks**` | Tulisan **tebal** |
| `*teks*` | Tulisan *miring* |
| `# Judul` | Judul besar |
| `## Sub Judul` | Sub judul |
| `- item` | Daftar bertitik |

Anda tidak perlu menghafal semuanya. CMS menyediakan tombol-tombol (seperti B untuk bold/tebal, I untuk italic/miring) di atas area penulisan yang bisa Anda klik.

### 6. Bagaimana cara membuat slug URL yang benar?

Slug URL adalah alamat singkat untuk konten Anda di website. Aturannya:

- Gunakan **huruf kecil** semua
- Ganti spasi dengan **tanda hubung** (-)
- Jangan gunakan karakter khusus seperti !, @, #, &
- Usahakan singkat tapi jelas

**Contoh:**
| Judul | Slug yang benar |
|-------|----------------|
| Pelatihan Kerajinan Tangan | `pelatihan-kerajinan-tangan` |
| Gotong Royong 17 Agustus | `gotong-royong-17-agustus` |
| UMKM Keripik Bu Ani | `umkm-keripik-bu-ani` |

### 7. Status "draft" dan "published" — apa bedanya?

- **Draft** = Konten tersimpan di sistem tapi **tidak terlihat** oleh pengunjung website. Gunakan status ini jika Anda masih menyiapkan konten atau ingin review dulu sebelum ditayangkan.
- **Published** = Konten **tayang dan bisa dilihat** semua pengunjung website.

**Tips:** Anda bisa mengubah status kapan saja. Misalnya, ubah dari "published" ke "draft" jika ingin menyembunyikan konten sementara tanpa menghapusnya.

### 8. Halaman CMS tidak bisa dibuka atau error

**Coba langkah-langkah ini:**

1. Pastikan koneksi internet Anda berjalan (coba buka situs lain)
2. Coba bersihkan cache browser: tekan `Ctrl + Shift + Delete`
3. Coba buka di browser lain (misalnya jika pakai Chrome, coba di Firefox)
4. Jika masih bermasalah, hubungi admin IT desa

---

## Kontak Bantuan

Jika Anda menemui masalah yang tidak bisa diselesaikan dengan panduan ini, silakan hubungi:

- **Admin IT Desa** — untuk masalah teknis (login, error, website tidak bisa diakses)
- **Kepala Seksi Informasi** — untuk pertanyaan tentang konten yang boleh dipublikasikan

---

*Panduan ini terakhir diperbarui: 2025*
