/**
 * formatBytes
 *
 * Converts a number of bytes into a human-readable string (e.g., 1024 → "1 KB").
 *
 * @param bytes - The number of bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns {string} Human-readable string
 *
 * @example
 * formatBytes(1024); // "1 KB"
 * formatBytes(1234, 1); // "1.2 KB"
 * formatBytes(0); // "0 Bytes"
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = Math.max(0, decimals);
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
