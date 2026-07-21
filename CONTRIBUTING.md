# Panduan Kontribusi

Dokumen ini menjelaskan cara berkontribusi pada proyek Website Desa Makmurjaya. Panduan ini ditujukan untuk pengembang masa depan yang ingin menambah fitur, memperbaiki bug, atau memperluas konten website.

## Daftar Isi

- [Cara Menambahkan Halaman Baru](#cara-menambahkan-halaman-baru)
- [Cara Menambahkan Collection Baru](#cara-menambahkan-collection-baru)
- [Konvensi Kode](#konvensi-kode)
- [Cara Menjalankan Tests](#cara-menjalankan-tests)
- [Cara Update Decap CMS Config](#cara-update-decap-cms-config)

---

## Cara Menambahkan Halaman Baru

Proyek ini menggunakan **file-based routing** dari Astro. Setiap file `.astro` di dalam `src/pages/` otomatis menjadi route halaman.

### Langkah-langkah

1. **Buat file baru** di `src/pages/` dengan nama kebab-case:

   ```
   src/pages/nama-halaman.astro
   ```

   Untuk halaman bersarang (nested), buat folder:

   ```
   src/pages/profil/sejarah.astro   → /profil/sejarah
   src/pages/profil/visi-misi.astro → /profil/visi-misi
   ```

2. **Import dan gunakan layout** `BaseLayout.astro`:

   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   ---

   <BaseLayout title="Judul Halaman" description="Deskripsi singkat untuk SEO">
     <section class="container mx-auto px-4 py-8">
       <h1 class="text-3xl font-bold text-gray-900">Judul Halaman</h1>
       <!-- Konten halaman di sini -->
     </section>
   </BaseLayout>
   ```

3. **Props yang tersedia di BaseLayout**:

   | Prop | Tipe | Wajib | Keterangan |
   |------|------|-------|------------|
   | `title` | `string` | Ya | Judul halaman (ditampilkan di tab browser) |
   | `description` | `string` | Ya | Deskripsi meta untuk SEO |
   | `image` | `string` | Tidak | URL gambar untuk Open Graph |
   | `type` | `'website' \| 'article'` | Tidak | Tipe konten Open Graph |
   | `publishedDate` | `string` | Tidak | Tanggal publikasi (untuk artikel) |
   | `canonical` | `string` | Tidak | URL canonical kustom |

4. **Untuk halaman dinamis** (berdasarkan collection), gunakan dynamic route:

   ```
   src/pages/berita/[slug].astro
   ```

   ```astro
   ---
   import { getCollection } from 'astro:content';
   import BaseLayout from '../../layouts/BaseLayout.astro';

   export async function getStaticPaths() {
     const entries = await getCollection('berita');
     return entries.map(entry => ({
       params: { slug: entry.slug },
       props: { entry },
     }));
   }

   const { entry } = Astro.props;
   const { Content } = await entry.render();
   ---

   <BaseLayout title={entry.data.judul} description={entry.data.cuplikan || ''}>
     <article class="container mx-auto px-4 py-8">
       <Content />
     </article>
   </BaseLayout>
   ```

---

## Cara Menambahkan Collection Baru

Content collections di Astro menyimpan konten terstruktur (berita, wisata, UMKM, dll). Untuk menambah collection baru, ikuti langkah berikut:

### 1. Definisikan Schema di `src/content/config.ts`

Tambahkan definisi collection baru dengan schema Zod:

```typescript
// Contoh: collection "kegiatan"
const kegiatanCollection = defineCollection({
  type: 'content', // 'content' untuk Markdown, 'data' untuk JSON
  schema: ({ image }) => z.object({
    judul: z.string(),
    tanggal: z.date(),
    foto: image().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
  }),
});
```

Kemudian daftarkan di objek `collections`:

```typescript
export const collections = {
  // ... collections yang sudah ada
  kegiatan: kegiatanCollection,
};
```

### 2. Buat Folder Collection di `src/content/`

```
src/content/kegiatan/
```

Tambahkan file contoh sesuai tipe:
- Tipe `content`: file `.md` dengan frontmatter
- Tipe `data`: file `.json`

Contoh file `src/content/kegiatan/kerja-bakti.md`:

```markdown
---
judul: "Kerja Bakti Bersama"
tanggal: 2024-01-15
status: published
---

Deskripsi kegiatan kerja bakti...
```

### 3. Tambahkan Konfigurasi di Decap CMS

Edit file `decap-cms/config.yml` dan tambahkan entry di bagian `collections`:

```yaml
- name: "kegiatan"
  label: "Kegiatan"
  folder: "src/content/kegiatan"
  create: true
  delete: true
  slug: "{{slug}}"
  fields:
    - { label: "Judul", name: "judul", widget: "string", required: true }
    - { label: "Slug URL", name: "slug", widget: "string", required: true }
    - { label: "Tanggal", name: "tanggal", widget: "datetime",
        date_format: "YYYY-MM-DD", time_format: false }
    - { label: "Foto", name: "foto", widget: "image", required: false }
    - { label: "Status", name: "status", widget: "select",
        options: ["draft", "published"], default: "draft" }
    - { label: "Isi", name: "body", widget: "markdown" }
```

### 4. Buat Halaman untuk Menampilkan Collection

- Buat halaman listing: `src/pages/kegiatan/index.astro`
- Buat halaman detail: `src/pages/kegiatan/[slug].astro`

### 5. (Opsional) Buat Folder Upload

Jika collection memerlukan upload media, buat folder:

```
public/uploads/kegiatan/.gitkeep
```

---

## Konvensi Kode

### TypeScript

- **Strict mode** aktif — jangan gunakan `any` type
- Semua variabel dan parameter harus memiliki tipe eksplisit atau bisa di-infer
- Gunakan `interface` untuk mendefinisikan props komponen
- Gunakan `z.infer<typeof schema>` untuk mendapatkan tipe dari schema Zod

```typescript
// ✅ Benar
interface BeritaCardProps {
  judul: string;
  tanggal: Date;
  cuplikan?: string;
}

// ❌ Salah — jangan gunakan any
function processData(data: any) { ... }
```

### Komponen Astro

- File menggunakan ekstensi `.astro`
- Penamaan file: **PascalCase** (contoh: `BeritaCard.astro`, `HeroSection.astro`)
- Props selalu didefinisikan dengan `interface Props` di frontmatter:

```astro
---
interface Props {
  judul: string;
  tanggal: Date;
  link: string;
}

const { judul, tanggal, link } = Astro.props;
---

<article>
  <h2>{judul}</h2>
</article>
```

- Organisasi komponen berdasarkan fitur:
  - `src/components/common/` — komponen global (Header, Footer, Breadcrumb)
  - `src/components/beranda/` — komponen khusus halaman beranda
  - `src/components/berita/` — komponen khusus fitur berita
  - `src/components/ui/` — komponen UI generik (Pagination, Badge, dll)

### Tailwind CSS

- Gunakan **utility classes** langsung, hindari custom CSS
- Pendekatan **mobile-first** untuk responsive design:

```html
<!-- Mobile default, lalu breakpoint naik -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  ...
</div>
```

- Breakpoint yang digunakan:
  - `sm:` — ≥640px (tablet kecil)
  - `md:` — ≥768px (tablet)
  - `lg:` — ≥1024px (desktop)
  - `xl:` — ≥1280px (desktop besar)

- Gunakan spacing dan warna konsisten dari konfigurasi Tailwind
- Hindari inline style — selalu gunakan utility class Tailwind

### Penamaan File

| Jenis | Konvensi | Contoh |
|-------|----------|--------|
| Halaman (pages) | kebab-case | `berita-desa.astro`, `visi-misi.astro` |
| Komponen | PascalCase | `BeritaCard.astro`, `HeroSection.astro` |
| Layout | PascalCase | `BaseLayout.astro` |
| Utility functions | kebab-case | `format-date.ts`, `pagination.ts` |
| Content files | kebab-case | `kerja-bakti.md`, `warung-makan.md` |
| Test files | kebab-case + `.test` | `format-date.test.ts`, `pagination.test.ts` |

---

## Cara Menjalankan Tests

Proyek ini menggunakan **Vitest** untuk unit testing dan **fast-check** untuk property-based testing.

### Perintah Dasar

```bash
# Jalankan semua test sekali
npx vitest run

# Jalankan test dalam mode watch (otomatis re-run saat file berubah)
npx vitest --watch

# Jalankan test dengan laporan coverage
npx vitest run --coverage
```

### Menulis Test Baru

Test ditempatkan bersama file source-nya dengan suffix `.test.ts`:

```
src/utils/format-date.ts       ← source
src/utils/format-date.test.ts  ← test
```

Contoh unit test:

```typescript
import { describe, it, expect } from 'vitest';
import { formatTanggal } from './format-date';

describe('formatTanggal', () => {
  it('memformat tanggal ke format Indonesia', () => {
    const result = formatTanggal(new Date('2024-01-15'));
    expect(result).toBe('15 Januari 2024');
  });
});
```

Contoh property-based test dengan fast-check:

```typescript
import { describe, it, expect } from 'vitest';
import { fc } from 'fast-check';
import { paginateItems } from './pagination';

describe('paginateItems - property tests', () => {
  it('selalu mengembalikan items ≤ pageSize', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string()),
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1 }),
        (items, pageSize, page) => {
          const result = paginateItems(items, pageSize, page);
          expect(result.data.length).toBeLessThanOrEqual(pageSize);
        }
      )
    );
  });
});
```

### Tips Testing

- Pastikan semua test lulus sebelum membuat Pull Request
- Target coverage minimal: 80% untuk file utility
- Gunakan `describe` untuk mengelompokkan test terkait
- Nama test harus deskriptif dan dalam Bahasa Indonesia atau Inggris

---

## Cara Update Decap CMS Config

Konfigurasi Decap CMS ada di file `decap-cms/config.yml`. File ini menentukan koleksi konten dan field apa saja yang bisa diisi oleh admin melalui antarmuka CMS.

### Struktur Dasar Config

```yaml
backend:
  name: github
  repo: username/repo-name
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "nama-collection"
    label: "Label Tampil di CMS"
    folder: "src/content/nama-collection"
    create: true
    fields:
      - { label: "Label Field", name: "nama_field", widget: "tipe-widget" }
```

### Widget yang Tersedia

| Widget | Kegunaan | Contoh Penggunaan |
|--------|----------|-------------------|
| `string` | Teks satu baris | Judul, nama |
| `text` | Teks multi-baris | Deskripsi singkat, cuplikan |
| `markdown` | Editor rich text | Isi artikel, konten halaman |
| `datetime` | Pemilih tanggal/waktu | Tanggal publikasi |
| `image` | Upload gambar | Foto thumbnail, foto profil |
| `number` | Input angka | Urutan, koordinat peta |
| `select` | Dropdown pilihan | Status (draft/published), kategori |
| `list` | Daftar item berulang | Galeri foto, lampiran |
| `file` | Upload file | Dokumen PDF, lampiran |
| `boolean` | Toggle ya/tidak | Fitur aktif/nonaktif |

### Menambah Field Baru ke Collection yang Ada

1. Buka `decap-cms/config.yml`
2. Cari collection yang ingin diubah
3. Tambahkan field baru di bagian `fields`:

```yaml
- { label: "Label Baru", name: "nama_field", widget: "string", required: false,
    hint: "Petunjuk untuk admin" }
```

4. **Penting**: pastikan nama field sesuai dengan schema di `src/content/config.ts`. Jika menambah field di CMS, tambahkan juga di schema Zod.

### Opsi Field yang Umum

```yaml
# Field wajib diisi
- { label: "Judul", name: "judul", widget: "string", required: true }

# Field opsional dengan hint
- { label: "Catatan", name: "catatan", widget: "text", required: false,
    hint: "Penjelasan tambahan untuk admin" }

# Field dengan nilai default
- { label: "Status", name: "status", widget: "select",
    options: ["draft", "published"], default: "draft" }

# Field gambar dengan hint ukuran
- { label: "Foto", name: "foto", widget: "image", required: false,
    hint: "Maks 5MB. Format: JPG, PNG, WebP" }

# Field angka dengan tipe float
- { label: "Latitude", name: "lat", widget: "number",
    required: false, value_type: "float" }
```

### Testing Perubahan CMS Secara Lokal

1. Jalankan development server:

   ```bash
   npm run dev
   ```

2. Buka CMS di browser: `http://localhost:4321/admin/`

3. Untuk testing tanpa autentikasi GitHub, tambahkan sementara di `public/admin/index.html`:

   ```html
   <!-- Tambahkan sebelum tag </body> untuk testing lokal -->
   <script>
     window.CMS_MANUAL_INIT = true;
     window.CMS_ENV = 'development';
   </script>
   ```

   Atau gunakan `local_backend` di config:

   ```yaml
   # Tambahkan di bagian atas decap-cms/config.yml (HANYA untuk development)
   local_backend: true
   ```

   Lalu jalankan Decap CMS proxy server:

   ```bash
   npx decap-server
   ```

4. **Jangan lupa hapus konfigurasi `local_backend`** sebelum push ke repository.

### Sinkronisasi Schema

Setiap kali mengubah field di CMS config, pastikan:

1. Schema Zod di `src/content/config.ts` diperbarui sesuai
2. Komponen yang menggunakan data collection diperbarui
3. Jalankan `npm run build` untuk memastikan tidak ada error tipe

---

## Pertanyaan?

Jika ada pertanyaan atau butuh bantuan lebih lanjut, silakan buat Issue di repository GitHub proyek ini.
