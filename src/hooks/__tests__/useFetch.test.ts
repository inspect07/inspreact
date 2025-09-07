import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';

describe('useFetch', () => {
  it('should set loading, data, and error states correctly', async () => {
    const fetcher = jest.fn().mockResolvedValue('result');
    const { result } = renderHook(() => useFetch(fetcher));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe('result');
    expect(result.current.error).toBeUndefined();
  });

  it('should handle errors', async () => {
    const fetcher = jest.fn().mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useFetch(fetcher));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('should refetch when refetch is called', async () => {
    let count = 0;
    const fetcher = jest.fn().mockImplementation(() => Promise.resolve(++count));
    const { result } = renderHook(() => useFetch(fetcher));
    await waitFor(() => expect(result.current.data).toBe(1));
    act(() => {
      result.current.refetch();
    });
    await waitFor(() => expect(result.current.data).toBe(2));
  });

  it('should refetch when deps change', async () => {
    let value = 0;
    const fetcher = jest.fn().mockImplementation(() => Promise.resolve(++value));
    const { result, rerender } = renderHook(({ dep }) => useFetch(fetcher, [dep]), {
      initialProps: { dep: 1 },
    });
    await waitFor(() => expect(result.current.data).toBe(1));
    rerender({ dep: 2 });
    await waitFor(() => expect(result.current.data).toBe(2));
  });
});
