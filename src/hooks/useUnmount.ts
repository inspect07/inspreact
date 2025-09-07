import { useEffect, useRef } from 'react';

/**
 * useUnmount
 *
 * Runs the provided callback only once when the component unmounts.
 * Uses a ref to always call the latest callback.
 *
 * @param callback Function to run on unmount
 *
 * @example
 * useUnmount(() => {
 *   // Cleanup logic here
 * });
 */
export function useUnmount(callback: () => void): void {
  const callbackRef = useRef(callback);
  // Update the ref with the latest callback
  callbackRef.current = callback;

  useEffect(() => {
    // Return cleanup function that will run on unmount
    return () => {
      if (typeof callbackRef.current === 'function') {
        callbackRef.current();
      }
    };
  }, []); // Empty dependency array ensures cleanup only runs on unmount
}
