import { slugify } from '../slugify';

describe('slugify', () => {
  it('converts basic strings', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('React & TypeScript')).toBe('react-typescript');
  });

  it('removes diacritics and special characters', () => {
    expect(slugify('Café au lait')).toBe('cafe-au-lait');
    expect(slugify('naïve façade')).toBe('naive-facade');
  });

  it('handles multiple spaces and hyphens', () => {
    expect(slugify('  hello   world  ')).toBe('hello-world');
    expect(slugify('foo---bar')).toBe('foo-bar');
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify('---hello---')).toBe('hello');
  });

  it('handles empty and non-alphanumeric strings', () => {
    expect(slugify('')).toBe('');
    expect(slugify('!!!')).toBe('');
  });
});
