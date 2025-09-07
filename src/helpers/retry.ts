/**
 * retry
 *
 * Retries an async function a specified number of times with optional delay between attempts.
 *
 * @template T - The return type of the async function
 * @param fn - The async function to retry
 * @param attempts - Maximum number of attempts (default: 3)
 * @param delayMs - Delay in milliseconds between attempts (default: 0)
 * @returns {Promise<T>} The result of the async function if successful
 * @throws The last error if all attempts fail
 *
 * @example
 * await retry(() => fetch('/api').then(r => r.json()), 3, 1000);
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 0
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1 && delayMs > 0) {
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
  }
  throw lastError;
}
