/**
 * slugify
 *
 * Converts a string to a URL-friendly slug (e.g., "Hello World!" → "hello-world").
 *
 * @param str - The string to slugify
 * @returns {string} The slugified string
 *
 * @example
 * slugify('Hello World!'); // "hello-world"
 * slugify('React & TypeScript'); // "react-typescript"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // split accented letters
    .replace(/\p{Diacritic}/gu, '') // remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // trim hyphens
    .replace(/-{2,}/g, '-'); // collapse multiple hyphens
}
