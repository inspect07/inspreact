/**
 * useFetch
 *
 * React hook for fetching data from an API or async function with loading, error, and data states.
 *
 * @template T - The type of the data returned by the fetcher
 * @param fetcher - An async function that returns the data
 * @param deps - Dependency array to re-run the fetcher
 * @returns {object} { data, error, loading, refetch }
 *
 * @example
 * const { data, error, loading, refetch } = useFetch(() => fetch('/api/user').then(res => res.json()), []);
 *
 * @example
 * // With dependencies
 * const { data, error, loading } = useFetch(() => fetch(`/api/user/${id}`).then(res => res.json()), [id]);
 */
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseFetchResult<T> {
  data: T | undefined;
  error: unknown;
  loading: boolean;
  refetch: () => void;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): UseFetchResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchId = useRef(0);

  const refetch = useCallback(() => {
    fetchId.current++;
    setLoading(true);
    setError(undefined);
    fetcher()
      .then((result) => {
        setData(result);
        setError(undefined);
      })
      .catch((err) => {
        setError(err);
        setData(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetch();
    // Only run when deps change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, error, loading, refetch };
}
