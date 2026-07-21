import { describe, it, expect } from 'vitest';
import { filterByQuery, highlightQuery, type SearchableItem } from './search';

describe('filterByQuery()', () => {
  const sampleItems: SearchableItem[] = [
    {
      judul: 'Peluncuran Website Desa',
      konten: 'Desa Makmurjaya meluncurkan website resmi baru.',
      url: '/berita/peluncuran-website',
      cuplikan: 'Website resmi desa kini tersedia.',
    },
    {
      judul: 'Pembangunan Jalan',
      konten: 'Proyek pembangunan jalan desa telah dimulai.',
      url: '/berita/pembangunan-jalan',
    },
    {
      judul: 'Festival Budaya',
      konten: 'Festival budaya tahunan akan diadakan bulan depan.',
      url: '/berita/festival-budaya',
      cuplikan: 'Acara budaya menarik untuk semua warga.',
    },
  ];

  it('mengembalikan array kosong jika query adalah string kosong', () => {
    expect(filterByQuery(sampleItems, '')).toEqual([]);
  });

  it('mengembalikan array kosong jika query hanya whitespace', () => {
    expect(filterByQuery(sampleItems, '   ')).toEqual([]);
    expect(filterByQuery(sampleItems, '\t\n')).toEqual([]);
  });

  it('memfilter berdasarkan judul (case-insensitive)', () => {
    const hasil = filterByQuery(sampleItems, 'festival');
    expect(hasil).toHaveLength(1);
    expect(hasil[0].judul).toBe('Festival Budaya');
  });

  it('memfilter berdasarkan konten (case-insensitive)', () => {
    const hasil = filterByQuery(sampleItems, 'PROYEK');
    expect(hasil).toHaveLength(1);
    expect(hasil[0].judul).toBe('Pembangunan Jalan');
  });

  it('memfilter berdasarkan cuplikan (case-insensitive)', () => {
    const hasil = filterByQuery(sampleItems, 'warga');
    expect(hasil).toHaveLength(1);
    expect(hasil[0].judul).toBe('Festival Budaya');
  });

  it('mengembalikan beberapa hasil jika query cocok di banyak item', () => {
    const hasil = filterByQuery(sampleItems, 'desa');
    expect(hasil.length).toBeGreaterThanOrEqual(2);
  });

  it('mengembalikan array kosong jika tidak ada item yang cocok', () => {
    expect(filterByQuery(sampleItems, 'xyz123')).toEqual([]);
  });

  it('menangani items kosong', () => {
    expect(filterByQuery([], 'test')).toEqual([]);
  });

  it('memfilter berdasarkan query dengan spasi di awal/akhir (di-trim)', () => {
    const hasil = filterByQuery(sampleItems, '  festival  ');
    expect(hasil).toHaveLength(1);
    expect(hasil[0].judul).toBe('Festival Budaya');
  });
});

describe('highlightQuery()', () => {
  it('mengembalikan teks asli jika query kosong', () => {
    expect(highlightQuery('Hello world', '')).toBe('Hello world');
  });

  it('mengembalikan teks asli jika query hanya whitespace', () => {
    expect(highlightQuery('Hello world', '   ')).toBe('Hello world');
  });

  it('membungkus kemunculan query dengan tag <mark>', () => {
    expect(highlightQuery('Website Desa Makmurjaya', 'desa')).toBe(
      'Website <mark>Desa</mark> Makmurjaya'
    );
  });

  it('highlight semua kemunculan (case-insensitive)', () => {
    expect(highlightQuery('Desa desa DESA', 'desa')).toBe(
      '<mark>Desa</mark> <mark>desa</mark> <mark>DESA</mark>'
    );
  });

  it('menangani karakter regex spesial dengan aman', () => {
    expect(highlightQuery('harga (termasuk pajak)', '(termasuk')).toBe(
      'harga <mark>(termasuk</mark> pajak)'
    );
  });

  it('menangani karakter regex titik', () => {
    expect(highlightQuery('versi 1.0 rilis', '1.0')).toBe(
      'versi <mark>1.0</mark> rilis'
    );
  });

  it('menangani karakter regex $', () => {
    expect(highlightQuery('harga $100', '$100')).toBe(
      'harga <mark>$100</mark>'
    );
  });

  it('mempertahankan casing asli teks saat highlight', () => {
    expect(highlightQuery('Festival BUDAYA tahunan', 'budaya')).toBe(
      'Festival <mark>BUDAYA</mark> tahunan'
    );
  });
});

import fc from 'fast-check';

/**
 * Property-Based Tests untuk filterByQuery
 * Validates: Requirements 11.2, 11.3
 */
describe('filterByQuery() — Property-Based Tests', () => {
  /**
   * Property 7: Hasil Pencarian Mengandung Kata Kunci
   * Validates: Requirements 11.2, 11.3
   *
   * Setiap item dalam hasil filterByQuery HARUS mengandung query string
   * (case-insensitive) di minimal satu field yang dapat dicari (judul, konten, atau cuplikan).
   */
  it('setiap hasil pencarian mengandung kata kunci di salah satu field (case-insensitive)', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            judul: fc.string(),
            konten: fc.string(),
            url: fc.string(),
          })
        ),
        fc.string({ minLength: 1 }),
        (items, query) => {
          const results = filterByQuery(items, query);
          const q = query.trim().toLowerCase();

          // Jika query hanya whitespace, hasil harus kosong
          if (!q) {
            return results.length === 0;
          }

          // Setiap item dalam hasil harus mengandung query di salah satu field
          return results.every((item) => {
            const judul = item.judul.toLowerCase();
            const konten = item.konten.toLowerCase();
            const cuplikan = (item.cuplikan ?? '').toLowerCase();
            return (
              judul.includes(q) || konten.includes(q) || cuplikan.includes(q)
            );
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('mengembalikan array kosong jika query kosong atau hanya whitespace', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            judul: fc.string(),
            konten: fc.string(),
            url: fc.string(),
          })
        ),
        fc.stringOf(fc.constantFrom(' ', '\t', '\n', '\r')),
        (items, whitespaceQuery) => {
          const results = filterByQuery(items, whitespaceQuery);
          return results.length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
