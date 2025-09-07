import { formatBytes } from '../formatBytes';

describe('formatBytes', () => {
  it('formats 0 bytes', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
  });

  it('formats bytes to KB', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1234, 1)).toBe('1.2 KB');
  });

  it('formats bytes to MB', () => {
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(1234567, 2)).toBe('1.18 MB');
  });

  it('formats bytes to GB', () => {
    expect(formatBytes(1073741824)).toBe('1 GB');
  });

  it('handles large numbers', () => {
    // 1 PB = 1,125,899,906,842,624 bytes
    expect(formatBytes(1125899906842624)).toMatch(/PB/);
  });

  it('handles negative and non-integer decimals', () => {
    expect(formatBytes(1024, -1)).toBe('1 KB');
    expect(formatBytes(1024, 0)).toBe('1 KB');
  });
});
