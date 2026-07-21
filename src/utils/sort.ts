/**
 * Utility untuk sorting koleksi berdasarkan tanggal dan nama usaha.
 * Validates: Requirements 4.1, 7.1
 */

/**
 * Sort array item berdasarkan field `tanggal` secara descending (terbaru di atas).
 * Digunakan di halaman Berita untuk menampilkan artikel dari yang terbaru.
 *
 * @param items - Array item yang memiliki field `tanggal` bertipe Date
 * @returns Array baru yang sudah diurutkan berdasarkan tanggal menurun
 */
export function sortByTanggalDesc<T extends { tanggal: Date }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime());
}

/**
 * Sort array item berdasarkan field `nama_usaha` secara alfabetis (case-insensitive).
 * Digunakan di halaman UMKM untuk menampilkan daftar usaha terurut berdasarkan nama.
 *
 * Validates: Requirements 7.1
 *
 * @param items - Array item yang memiliki field `nama_usaha` bertipe string
 * @returns Array baru yang sudah diurutkan berdasarkan nama_usaha secara alfabetis
 */
export function sortByNamaUsaha<T extends { nama_usaha: string }>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    a.nama_usaha.toLowerCase().localeCompare(b.nama_usaha.toLowerCase())
  );
}
