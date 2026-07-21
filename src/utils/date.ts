/**
 * Utility untuk format tanggal dalam bahasa Indonesia.
 */

const BULAN_INDONESIA = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
] as const;

/**
 * Format objek Date ke format tanggal Indonesia: "D bulan YYYY"
 * Contoh: 5 Januari 2024, 23 November 2023
 *
 * @param date - Objek Date yang akan diformat
 * @returns String tanggal dalam format "D bulan YYYY"
 */
export function formatTanggalIndonesia(date: Date): string {
  const tanggal = date.getDate();
  const bulan = BULAN_INDONESIA[date.getMonth()];
  const tahun = date.getFullYear();

  return `${tanggal} ${bulan} ${tahun}`;
}
