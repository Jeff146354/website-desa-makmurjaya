/**
 * Utility untuk pencarian konten website desa.
 * Validates: Requirements 11.2, 11.3
 */

/**
 * Interface untuk item yang dapat dicari.
 */
export interface SearchableItem {
  judul: string;
  konten: string;
  url: string;
  cuplikan?: string;
}

/**
 * Filter item berdasarkan query pencarian (case-insensitive).
 * Mengembalikan array kosong jika query blank/whitespace-only.
 * Mencari kecocokan pada field judul, konten, dan cuplikan.
 *
 * @param items - Koleksi item yang akan difilter
 * @param query - Kata kunci pencarian
 * @returns Item yang cocok dengan query
 */
export function filterByQuery(
  items: SearchableItem[],
  query: string
): SearchableItem[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const q = trimmed.toLowerCase();

  return items.filter((item) => {
    const judul = item.judul.toLowerCase();
    const konten = item.konten.toLowerCase();
    const cuplikan = (item.cuplikan ?? '').toLowerCase();

    return judul.includes(q) || konten.includes(q) || cuplikan.includes(q);
  });
}

/**
 * Highlight kemunculan query dalam teks dengan tag <mark>.
 * Case-insensitive. Mengembalikan teks asli jika query blank.
 * Menangani karakter regex spesial dengan aman (di-escape).
 *
 * @param text - Teks yang akan di-highlight
 * @param query - Kata kunci yang akan di-highlight
 * @returns Teks dengan kemunculan query dibungkus tag <mark>
 */
export function highlightQuery(text: string, query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}
