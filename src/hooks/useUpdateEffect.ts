import { useEffect, useRef } from 'react';

/**
 * useUpdateEffect
 *
 * Runs the effect only on updates, not on initial mount.
 *
 * @param effect Effect callback
 * @param deps Dependency array (optional)
 *
 * @example
 * useUpdateEffect(() => {
 *   // Do something only on updates
 * }, [someValue]);
 */
export function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return effect();
    } else {
      isMounted.current = true;
    }
    // Only run effect on updates
  }, deps);
}
