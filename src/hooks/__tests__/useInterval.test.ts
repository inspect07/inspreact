import { renderHook, act } from '@testing-library/react';
import { useInterval } from '../useInterval';
import { useState } from 'react';

jest.useFakeTimers();

describe('useInterval', () => {
  it('calls callback at specified interval', () => {
    const fn = jest.fn();
    renderHook(() => useInterval(fn, 1000));
    expect(fn).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('pauses when delay is null', () => {
    const fn = jest.fn();
    renderHook(() => useInterval(fn, null));
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(fn).not.toHaveBeenCalled();
  });

  it('updates callback if it changes', () => {
    let value = 0;
    const { rerender } = renderHook(({ cb, delay }) => useInterval(cb, delay), {
      initialProps: {
        cb: () => value++,
        delay: 1000,
      },
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(value).toBe(1);
    rerender({ cb: () => (value += 2), delay: 1000 });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(value).toBe(3);
  });

  it('cleans up interval on unmount', () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useInterval(fn, 1000));
    unmount();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(fn).not.toHaveBeenCalled();
  });
});
