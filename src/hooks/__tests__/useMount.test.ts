import { renderHook } from '@testing-library/react';
import { useMount } from '../useMount';

describe('useMount', () => {
  it('calls the callback on mount', () => {
    const fn = jest.fn();
    renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback on update', () => {
    const fn = jest.fn();
    const { rerender } = renderHook(() => useMount(fn));
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not throw if callback is not a function', () => {
    expect(() => renderHook(() => useMount(undefined as any))).not.toThrow();
    expect(() => renderHook(() => useMount(null as any))).not.toThrow();
  });
});
