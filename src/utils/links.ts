/**
 * Utility for building internal paths with the correct base URL prefix.
 * This ensures links work correctly when deployed to a subdirectory (e.g. GitHub Pages).
 *
 * Usage: getPath('/berita') → '/website-desa-makmurjaya/berita'
 */
export function getPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path since base already ends with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
