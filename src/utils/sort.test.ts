import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { sortByTanggalDesc, sortByNamaUsaha } from './sort';

/**
 * **Validates: Requirements 4.1**
 *
 * Property-based test untuk memverifikasi bahwa sortByTanggalDesc
 * selalu menghasilkan urutan tanggal menurun (terbaru di atas).
 */
describe('sortByTanggalDesc() — Property-Based Tests', () => {
  it('Property 3: Urutan Tanggal Menurun — sorted items memiliki tanggal[i] >= tanggal[i+1]', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({ tanggal: fc.date(), judul: fc.string() })),
        (items) => {
          const sorted = sortByTanggalDesc(items);

          // Verifikasi tanggal[i] >= tanggal[i+1] untuk semua i
          for (let i = 0; i < sorted.length - 1; i++) {
            expect(sorted[i].tanggal.getTime()).toBeGreaterThanOrEqual(
              sorted[i + 1].tanggal.getTime()
            );
          }
        }
      )
    );
  });
});

/**
 * **Validates: Requirements 7.1**
 *
 * Property-based test untuk memverifikasi bahwa sortByNamaUsaha
 * selalu menghasilkan urutan alfabetis berdasarkan nama_usaha (case-insensitive).
 */
describe('sortByNamaUsaha() — Property-Based Tests', () => {
  it('Property 4: Urutan Alfabetis — sorted items memiliki nama_usaha[i].toLowerCase() <= nama_usaha[i+1].toLowerCase()', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({ nama_usaha: fc.string() })),
        (items) => {
          const sorted = sortByNamaUsaha(items);

          // Verifikasi nama_usaha[i].toLowerCase() <= nama_usaha[i+1].toLowerCase() untuk semua i
          for (let i = 0; i < sorted.length - 1; i++) {
            expect(
              sorted[i].nama_usaha.toLowerCase().localeCompare(sorted[i + 1].nama_usaha.toLowerCase())
            ).toBeLessThanOrEqual(0);
          }
        }
      )
    );
  });
});
