# Panduan Keamanan Repository

Dokumen ini berisi instruksi untuk mengonfigurasi keamanan repository GitHub agar hanya akun yang diizinkan yang dapat mengubah konten dan memastikan tidak ada kredensial sensitif yang terekspos di source code.

---

## 1. Branch Protection pada `main`

Branch protection memastikan bahwa perubahan ke branch utama harus melalui proses review (Pull Request) sebelum digabungkan.

### Langkah-langkah Setup

1. Buka repository di GitHub, lalu navigasi ke **Settings > Branches**.
2. Di bagian **Branch protection rules**, klik **Add rule** (atau **Add branch ruleset** untuk ruleset baru).
3. Isi **Branch name pattern** dengan `main`.
4. Aktifkan opsi berikut:

#### a. Require a Pull Request Before Merging

- Centang **Require a pull request before merging**.
- Set **Required number of approvals** minimal `1`.
- (Opsional) Centang **Dismiss stale pull request approvals when new commits are pushed** agar approval lama otomatis dibatalkan jika ada commit baru.

#### b. Require Status Checks to Pass

- Centang **Require status checks to pass before merging**.
- Tambahkan status check dari GitHub Actions workflow (misalnya `build` atau nama job di `deploy.yml`).
- Centang **Require branches to be up to date before merging** agar branch harus di-update sebelum merge.

#### c. Restrict Who Can Push

- Centang **Restrict who can push to matching branches**.
- Tambahkan hanya akun pengelola utama (misalnya akun admin desa atau tim developer) yang diizinkan push langsung.
- Untuk alur kerja normal, semua kontributor wajib menggunakan Pull Request.

#### d. Opsi Tambahan (Direkomendasikan)

- **Do not allow bypassing the above settings**: Centang agar bahkan admin tidak bisa bypass aturan tanpa alasan.
- **Require conversation resolution before merging**: Pastikan semua komentar review diselesaikan sebelum merge.
- **Require linear history**: Mencegah merge commit, memaksa rebase atau squash merge untuk history yang bersih.

5. Klik **Create** atau **Save changes**.

### Verifikasi

Setelah diaktifkan, coba push langsung ke `main` — seharusnya ditolak. Semua perubahan harus melalui Pull Request yang sudah di-review dan lulus status checks.

---

## 2. Perlindungan Kredensial dan Informasi Sensitif

### Prinsip Utama

- **TIDAK PERNAH** menyimpan API key, password, token, atau kredensial lain langsung di source code.
- Semua nilai sensitif disimpan sebagai **GitHub Secrets** dan diakses melalui environment variable.

### File `.gitignore`

File `.gitignore` sudah dikonfigurasi untuk mengabaikan:

```
# Environment variables
.env
.env.*
.env.local
.env.development
.env.production

# Security-sensitive files
*.pem
*.key
*.cert
*.p12
*.pfx
*.jks
```

### Penggunaan Environment Variable

Proyek ini menggunakan environment variable untuk nilai sensitif:

| Variable | Kegunaan | Tempat Penyimpanan |
|----------|----------|-------------------|
| `FORMSPREE_ENDPOINT` | URL endpoint form kontak | GitHub Secrets |

#### Cara Menambahkan GitHub Secrets

1. Buka repository di GitHub, navigasi ke **Settings > Secrets and variables > Actions**.
2. Klik **New repository secret**.
3. Isi nama (misalnya `FORMSPREE_ENDPOINT`) dan nilainya.
4. Klik **Add secret**.

Secret ini otomatis tersedia di GitHub Actions workflow melalui `${{ secrets.NAMA_SECRET }}`.

#### Penggunaan di Kode

```javascript
// BENAR — menggunakan environment variable
const endpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || '';

// SALAH — hardcoded (JANGAN lakukan ini)
const endpoint = 'https://formspree.io/f/xxxxx';
```

### Checklist Keamanan Kode

Sebelum setiap commit, pastikan:

- [ ] Tidak ada API key atau token yang hardcoded
- [ ] Tidak ada URL endpoint sensitif yang ditulis langsung di kode
- [ ] File `.env` tidak ter-commit (cek dengan `git status`)
- [ ] Tidak ada file sertifikat (`.pem`, `.key`, `.cert`) di repository

### Cara Audit

Jalankan perintah berikut untuk memverifikasi tidak ada kredensial yang ter-commit:

```bash
# Cari pola yang mencurigakan di seluruh source code
git grep -i "api_key\|apikey\|secret\|password\|token\|credential" -- ':(exclude)node_modules' ':(exclude)package-lock.json'

# Cari URL Formspree yang hardcoded
git grep -i "formspree.io/f/" -- '*.ts' '*.js' '*.astro'

# Pastikan .env tidak terlacak
git ls-files --error-unmatch .env 2>/dev/null && echo "PERINGATAN: .env terlacak!" || echo "OK: .env tidak terlacak"
```

---

## 3. Keamanan GitHub Actions Workflow

Workflow CI/CD (`deploy.yml`) sudah dikonfigurasi dengan prinsip keamanan:

- **Permissions minimal**: Hanya `contents: read`, `pages: write`, dan `id-token: write`
- **Secrets via environment**: `FORMSPREE_ENDPOINT` diambil dari GitHub Secrets, bukan hardcoded
- **Concurrency control**: Hanya satu deployment yang berjalan bersamaan untuk mencegah race condition

---

## 4. Akses dan Autentikasi CMS

Decap CMS menggunakan GitHub OAuth untuk autentikasi. Hanya pengguna dengan akses write ke repository yang dapat login ke `/admin` dan mengelola konten.

### Mengatur Akses Kolaborator

1. Buka repository di GitHub, navigasi ke **Settings > Collaborators and teams**.
2. Klik **Add people** dan tambahkan akun GitHub pengelola desa.
3. Set permission level ke **Write** (dapat push dan membuat PR) atau **Maintain** (write + manage tanpa admin access).
4. Jangan berikan **Admin** access kecuali benar-benar diperlukan.

---

## Ringkasan

| Aspek | Status | Keterangan |
|-------|--------|------------|
| Branch protection | Perlu dikonfigurasi | Ikuti langkah di Bagian 1 |
| Kredensial di kode | Aman | Tidak ada hardcoded secrets |
| `.gitignore` | Dikonfigurasi | `.env`, `.pem`, `.key` sudah diabaikan |
| GitHub Secrets | Dikonfigurasi | `FORMSPREE_ENDPOINT` tersimpan aman |
| CMS access control | Via GitHub OAuth | Hanya akun dengan akses repo |
