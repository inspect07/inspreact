import { useEffect, useState } from "react";

/**
 * useLocalStorage
 *
 * React hook to persist state in localStorage with serializer/deserializer, error handling, and SSR safety.
 *
 * @template T
 * @param key Storage key
 * @param initial Initial value
 * @param options Optional serializer/deserializer
 * @returns {[T, (v: T) => void]} State and setter
 *
 * @example
 * const [value, setValue] = useLocalStorage('count', 0);
 *
 * @example
 * // With custom serializer/deserializer
 * const [user, setUser] = useLocalStorage('user', null, {
 *   serializer: u => btoa(JSON.stringify(u)),
 *   deserializer: s => JSON.parse(atob(s)),
 * });
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
  options?: {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
  }
): [T, (v: T) => void] {
  const isClient = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  const serializer = options?.serializer ?? JSON.stringify;
  const deserializer = options?.deserializer ?? ((v: string) => JSON.parse(v) as T);

  const [value, setValue] = useState<T>(() => {
    if (!isClient) return initial;
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        return deserializer(stored);
      }
    } catch (err) {
      // Fallback to initial on error
      // Optionally log error
    }
    return initial;
  });

  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(key, serializer(value));
    } catch (err) {
      // Optionally log error
    }
  }, [key, value, serializer, isClient]);

  return [value, setValue];
}
