import { describe, it, expect } from 'vitest';
import { formatRupiah } from './currency';

describe('formatRupiah', () => {
  it('should format zero', () => {
    expect(formatRupiah(0)).toBe('Rp 0');
  });

  it('should format thousands with dot separator', () => {
    expect(formatRupiah(1000)).toBe('Rp 1.000');
  });

  it('should format millions', () => {
    expect(formatRupiah(2500000)).toBe('Rp 2.500.000');
  });

  it('should format small numbers without separator', () => {
    expect(formatRupiah(500)).toBe('Rp 500');
  });

  it('should format large numbers correctly', () => {
    expect(formatRupiah(1000000000)).toBe('Rp 1.000.000.000');
  });

  it('should handle negative numbers', () => {
    const result = formatRupiah(-5000);
    expect(result).toContain('5.000');
  });
});

import fc from 'fast-check';

/**
 * **Validates: Requirements 21.3**
 * Property 9: Format Mata Uang Rupiah
 */
describe('formatRupiah - Property-Based Tests', () => {
  it('output selalu diawali "Rp " (dengan spasi)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 999_999_999 }), (angka) => {
        const result = formatRupiah(angka);
        expect(result.startsWith('Rp ')).toBe(true);
      })
    );
  });

  it('output tidak pernah mengandung "NaN"', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 999_999_999 }), (angka) => {
        const result = formatRupiah(angka);
        expect(result).not.toContain('NaN');
      })
    );
  });

  it('output tidak pernah mengandung "undefined"', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 999_999_999 }), (angka) => {
        const result = formatRupiah(angka);
        expect(result).not.toContain('undefined');
      })
    );
  });

  // Contoh konkret
  it('formatRupiah(0) → "Rp 0"', () => {
    expect(formatRupiah(0)).toBe('Rp 0');
  });

  it('formatRupiah(1000) → "Rp 1.000"', () => {
    expect(formatRupiah(1000)).toBe('Rp 1.000');
  });

  it('formatRupiah(150000) → "Rp 150.000"', () => {
    expect(formatRupiah(150000)).toBe('Rp 150.000');
  });
});
