import { renderHook } from '@testing-library/react';
import { useUnmount } from '../useUnmount';
import { useState } from 'react';

describe('useUnmount', () => {
  it('calls the callback on unmount', () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useUnmount(fn));
    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback on mount', () => {
    const fn = jest.fn();
    renderHook(() => useUnmount(fn));
    expect(fn).not.toHaveBeenCalled();
  });

  it('does not throw if callback is not a function', () => {
    const { unmount } = renderHook(() => useUnmount(undefined as any));
    expect(() => unmount()).not.toThrow();
    const { unmount: unmount2 } = renderHook(() => useUnmount(null as any));
    expect(() => unmount2()).not.toThrow();
  });
});
