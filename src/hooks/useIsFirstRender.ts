/**
 * useIsFirstRender
 *
 * React hook to determine if the current render is the first render of the component.
 *
 * @returns {boolean} True if this is the first render, false otherwise.
 *
 * @example
 * const isFirst = useIsFirstRender();
 * useEffect(() => {
 *   if (!isFirst) {
 *     // Do something only on updates
 *   }
 * }, [someValue]);
 */
import { useRef } from 'react';

export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return false;
}
