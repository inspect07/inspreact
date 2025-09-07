/**
 * useInterval
 *
 * React hook for running a callback on a set interval, declaratively.
 *
 * @param callback Function to run on each interval
 * @param delay Interval delay in milliseconds. If null, interval is paused.
 *
 * @example
 * useInterval(() => {
 *   // Do something every second
 * }, 1000);
 *
 * @example
 * // Pause interval
 * useInterval(() => { ... }, null);
 */
import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
