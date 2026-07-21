/**
 * Utility untuk format mata uang Rupiah Indonesia.
 */

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Format angka ke format mata uang Rupiah: "Rp X.XXX"
 * Contoh: 1000 → "Rp 1.000", 2500000 → "Rp 2.500.000"
 *
 * @param angka - Angka yang akan diformat ke Rupiah
 * @returns String dalam format "Rp X.XXX"
 */
export function formatRupiah(angka: number): string {
  // Intl.NumberFormat id-ID uses non-breaking space (U+00A0) between "Rp" and number.
  // Replace with regular space for consistent output.
  return rupiahFormatter.format(angka).replace(/\u00A0/g, ' ');
}
