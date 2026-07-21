import { describe, it, expect } from 'vitest';
import { paginate, type PaginationResult } from './pagination';

describe('paginate()', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  it('mengembalikan halaman pertama dengan benar', () => {
    const result = paginate(items, 1, 3);
    expect(result.data).toEqual(['a', 'b', 'c']);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(4);
    expect(result.totalItems).toBe(10);
    expect(result.pageSize).toBe(3);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPrevPage).toBe(false);
  });

  it('mengembalikan halaman tengah dengan benar', () => {
    const result = paginate(items, 2, 3);
    expect(result.data).toEqual(['d', 'e', 'f']);
    expect(result.currentPage).toBe(2);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPrevPage).toBe(true);
  });

  it('mengembalikan halaman terakhir dengan sisa item', () => {
    const result = paginate(items, 4, 3);
    expect(result.data).toEqual(['j']);
    expect(result.currentPage).toBe(4);
    expect(result.totalPages).toBe(4);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPrevPage).toBe(true);
  });

  it('clamp page < 1 ke halaman 1', () => {
    const result = paginate(items, 0, 3);
    expect(result.currentPage).toBe(1);
    expect(result.data).toEqual(['a', 'b', 'c']);
  });

  it('clamp page negatif ke halaman 1', () => {
    const result = paginate(items, -5, 3);
    expect(result.currentPage).toBe(1);
    expect(result.data).toEqual(['a', 'b', 'c']);
  });

  it('clamp page > totalPages ke halaman terakhir', () => {
    const result = paginate(items, 100, 3);
    expect(result.currentPage).toBe(4);
    expect(result.data).toEqual(['j']);
  });

  it('mengembalikan result yang benar untuk items kosong', () => {
    const result = paginate([], 1, 5);
    expect(result.data).toEqual([]);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(0);
    expect(result.totalItems).toBe(0);
    expect(result.pageSize).toBe(5);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPrevPage).toBe(false);
  });

  it('mengembalikan result yang benar ketika semua item muat di 1 halaman', () => {
    const result = paginate(['x', 'y'], 1, 10);
    expect(result.data).toEqual(['x', 'y']);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPrevPage).toBe(false);
  });

  it('mengembalikan result yang benar ketika pageSize === jumlah item', () => {
    const result = paginate(items, 1, 10);
    expect(result.data).toEqual(items);
    expect(result.totalPages).toBe(1);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPrevPage).toBe(false);
  });

  it('bekerja dengan tipe generic yang berbeda', () => {
    const numItems = [1, 2, 3, 4, 5];
    const result = paginate(numItems, 2, 2);
    expect(result.data).toEqual([3, 4]);
    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(3);
  });

  it('membulatkan halaman desimal ke bawah', () => {
    const result = paginate(items, 2.7, 3);
    expect(result.currentPage).toBe(2);
    expect(result.data).toEqual(['d', 'e', 'f']);
  });
});

import fc from 'fast-check';

/**
 * **Validates: Requirements 4.4, 5.7, 7.5**
 *
 * Property-based tests untuk memverifikasi kebenaran paginasi:
 * - Semua halaman gabungan = koleksi asli
 * - Halaman non-terakhir selalu penuh (data.length === pageSize)
 * - Halaman terakhir ≤ pageSize
 */
describe('paginate() — Property-Based Tests (Kebenaran Paginasi)', () => {
  it('Property 1: Semua halaman gabungan sama dengan koleksi asli', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string()),
        fc.integer({ min: 1, max: 50 }),
        (items, pageSize) => {
          const totalPages = items.length === 0 ? 0 : Math.ceil(items.length / pageSize);

          const allData: string[] = [];
          for (let page = 1; page <= totalPages; page++) {
            const result = paginate(items, page, pageSize);
            allData.push(...result.data);
          }

          expect(allData).toEqual(items);
        }
      )
    );
  });

  it('Property 2: Halaman non-terakhir selalu penuh (data.length === pageSize)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string()),
        fc.integer({ min: 1, max: 50 }),
        (items, pageSize) => {
          const totalPages = items.length === 0 ? 0 : Math.ceil(items.length / pageSize);

          for (let page = 1; page < totalPages; page++) {
            const result = paginate(items, page, pageSize);
            expect(result.data.length).toBe(pageSize);
          }
        }
      )
    );
  });

  it('Property 3: Halaman terakhir memiliki ≤ pageSize item', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string()),
        fc.integer({ min: 1, max: 50 }),
        (items, pageSize) => {
          const totalPages = items.length === 0 ? 0 : Math.ceil(items.length / pageSize);

          if (totalPages > 0) {
            const lastPage = paginate(items, totalPages, pageSize);
            expect(lastPage.data.length).toBeLessThanOrEqual(pageSize);
            expect(lastPage.data.length).toBeGreaterThan(0);
          }
        }
      )
    );
  });
});
