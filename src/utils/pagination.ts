/**
 * Utility untuk paginasi koleksi item.
 * Validates: Requirements 4.4, 5.7, 7.5
 */

/**
 * Hasil paginasi yang berisi data halaman saat ini beserta metadata navigasi.
 */
export interface PaginationResult<T> {
  /** Item pada halaman saat ini */
  data: T[];
  /** Nomor halaman saat ini (1-indexed) */
  currentPage: number;
  /** Jumlah total halaman */
  totalPages: number;
  /** Jumlah total item di seluruh halaman */
  totalItems: number;
  /** Jumlah item per halaman */
  pageSize: number;
  /** Apakah ada halaman selanjutnya */
  hasNextPage: boolean;
  /** Apakah ada halaman sebelumnya */
  hasPrevPage: boolean;
}

/**
 * Paginasi koleksi item berdasarkan nomor halaman dan ukuran halaman.
 *
 * Edge cases:
 * - Jika `page < 1`, di-clamp ke halaman 1
 * - Jika `page > totalPages`, mengembalikan halaman terakhir (atau data kosong jika items kosong)
 * - Jika `items` kosong, mengembalikan result dengan data kosong dan totalPages = 0
 *
 * @param items - Koleksi item yang akan dipaginasi
 * @param page - Nomor halaman yang diminta (1-indexed)
 * @param pageSize - Jumlah item per halaman
 * @returns Objek PaginationResult dengan data halaman dan metadata navigasi
 */
export function paginate<T>(items: T[], page: number, pageSize: number): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);

  // Clamp page ke range yang valid
  let safePage: number;
  if (totalItems === 0) {
    safePage = 1;
  } else if (page < 1) {
    safePage = 1;
  } else if (page > totalPages) {
    safePage = totalPages;
  } else {
    safePage = Math.floor(page);
  }

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const data = items.slice(start, end);

  return {
    data,
    currentPage: safePage,
    totalPages,
    totalItems,
    pageSize,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  };
}
