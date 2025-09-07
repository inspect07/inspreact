import { renderHook, act } from '@testing-library/react';
import { useUpdateEffect } from '../useUpdateEffect';
import { useState } from 'react';

describe('useUpdateEffect', () => {
  it('does not call effect on mount', () => {
    const fn = jest.fn();
    renderHook(() => useUpdateEffect(fn, []));
    expect(fn).not.toHaveBeenCalled();
  });

  it('calls effect on update', () => {
    const fn = jest.fn();
    let setValue: (v: number) => void = () => {};
    const { rerender } = renderHook(() => {
      const [value, set] = useState(0);
      setValue = set;
      useUpdateEffect(fn, [value]);
    });
    act(() => setValue(1));
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('handles cleanup correctly', () => {
    const cleanup = jest.fn();
    let setValue: (v: number) => void = () => {};
    const { rerender, unmount } = renderHook(() => {
      const [value, set] = useState(0);
      setValue = set;
      useUpdateEffect(() => {
        return cleanup;
      }, [value]);
    });
    act(() => setValue(1));
    rerender();
    unmount();
    expect(cleanup).toHaveBeenCalled();
  });
});
