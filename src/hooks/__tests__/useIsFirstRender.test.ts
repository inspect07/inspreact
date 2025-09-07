import { renderHook, act } from '@testing-library/react';
import { useIsFirstRender } from '../useIsFirstRender';
import { useState } from 'react';

describe('useIsFirstRender', () => {
  it('returns true on first render, false on subsequent renders', () => {
    let setValue: (v: number) => void = () => {};
    const { result, rerender } = renderHook(() => {
      const [value, set] = useState(0);
      setValue = set;
      return useIsFirstRender();
    });
    expect(result.current).toBe(true);
    act(() => setValue(1));
    rerender();
    expect(result.current).toBe(false);
    act(() => setValue(2));
    rerender();
    expect(result.current).toBe(false);
  });
});
