import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with initial value if nothing in storage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 42));
    expect(result.current[0]).toBe(42);
  });

  it('reads from localStorage if present', () => {
    localStorage.setItem('key', JSON.stringify(99));
    const { result } = renderHook(() => useLocalStorage('key', 42));
    expect(result.current[0]).toBe(99);
  });

  it('writes to localStorage on value change', () => {
    const { result } = renderHook(() => useLocalStorage('key', 1));
    act(() => {
      result.current[1](2);
    });
    expect(localStorage.getItem('key')).toBe('2');
  });

  it('supports custom serializer/deserializer', () => {
    const serializer = (v: number[]) => v.join(',');
    const deserializer = (s: string) => s.split(',').map(Number);
    const { result } = renderHook(() => useLocalStorage('arr', [1, 2, 3], { serializer, deserializer }));
    act(() => {
      result.current[1]([4, 5, 6]);
    });
    expect(localStorage.getItem('arr')).toBe('4,5,6');
    // Re-render to test deserialization
    const { result: result2 } = renderHook(() => useLocalStorage('arr', [], { serializer, deserializer }));
    expect(result2.current[0]).toEqual([4, 5, 6]);
  });

  it('handles JSON parse errors gracefully', () => {
    localStorage.setItem('bad', '{not json');
    const { result } = renderHook(() => useLocalStorage('bad', 123));
    expect(result.current[0]).toBe(123);
  });

  it('is SSR safe (does not throw if localStorage is undefined)', () => {
    const original = globalThis.localStorage;
    delete globalThis.localStorage;
    expect(() => renderHook(() => useLocalStorage('ssr', 'x'))).not.toThrow();
    globalThis.localStorage = original;
  });
});
