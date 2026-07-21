import { describe, it, expect } from 'vitest';
import { formatTanggalIndonesia } from './date';

describe('formatTanggalIndonesia', () => {
  it('should format date with Indonesian month name', () => {
    const date = new Date(2024, 0, 5); // 5 Januari 2024
    expect(formatTanggalIndonesia(date)).toBe('5 Januari 2024');
  });

  it('should handle all months correctly', () => {
    const expectedMonths = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    expectedMonths.forEach((bulan, index) => {
      const date = new Date(2024, index, 15);
      expect(formatTanggalIndonesia(date)).toBe(`15 ${bulan} 2024`);
    });
  });

  it('should not pad single-digit days with zero', () => {
    const date = new Date(2023, 2, 1); // 1 Maret 2023
    expect(formatTanggalIndonesia(date)).toBe('1 Maret 2023');
  });

  it('should handle double-digit days', () => {
    const date = new Date(2023, 10, 23); // 23 November 2023
    expect(formatTanggalIndonesia(date)).toBe('23 November 2023');
  });

  it('should handle end of month dates', () => {
    const date = new Date(2024, 0, 31); // 31 Januari 2024
    expect(formatTanggalIndonesia(date)).toBe('31 Januari 2024');
  });
});

import fc from 'fast-check';

/**
 * **Validates: Requirements 21.2**
 * Property 8: Format Tanggal Indonesia
 * Untuk setiap tanggal, output formatTanggalIndonesia selalu memiliki
 * 3 bagian: hari (1-31), bulan nama Indonesia, dan tahun 4 digit.
 */
describe('formatTanggalIndonesia - Property-Based Tests', () => {
  const BULAN_INDONESIA = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  // Constrain dates to years 1000-9999 to ensure 4-digit year output
  const dateArb = fc.date({
    min: new Date('1000-01-01T00:00:00.000Z'),
    max: new Date('9999-12-30T00:00:00.000Z'),
  });

  it('should always produce exactly 3 space-separated parts', () => {
    fc.assert(
      fc.property(dateArb, (date) => {
        const result = formatTanggalIndonesia(date);
        const parts = result.split(' ');
        expect(parts).toHaveLength(3);
      })
    );
  });

  it('should always have day between 1 and 31', () => {
    fc.assert(
      fc.property(dateArb, (date) => {
        const result = formatTanggalIndonesia(date);
        const [dayStr] = result.split(' ');
        const day = Number(dayStr);
        expect(day).toBeGreaterThanOrEqual(1);
        expect(day).toBeLessThanOrEqual(31);
      })
    );
  });

  it('should always have a valid Indonesian month name', () => {
    fc.assert(
      fc.property(dateArb, (date) => {
        const result = formatTanggalIndonesia(date);
        const parts = result.split(' ');
        const bulan = parts[1];
        expect(BULAN_INDONESIA).toContain(bulan);
      })
    );
  });

  it('should always have a 4-digit year', () => {
    fc.assert(
      fc.property(dateArb, (date) => {
        const result = formatTanggalIndonesia(date);
        const parts = result.split(' ');
        const tahun = parts[2];
        expect(tahun).toMatch(/^\d{4}$/);
      })
    );
  });
});
