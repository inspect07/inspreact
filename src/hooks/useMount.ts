import { useEffect } from 'react';

/**
 * useMount
 *
 * Runs the provided callback only once when the component mounts.
 *
 * @param callback Function to run on mount
 *
 * @example
 * useMount(() => {
 *   // Do something on mount
 * });
 */
export function useMount(callback: () => void): void {
  useEffect(() => {
    if (typeof callback === 'function') {
      callback();
    }
  }, []); // Empty dependency array ensures this only runs on mount
}
