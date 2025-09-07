import { retry } from '../retry';

describe('retry', () => {
  it('resolves if fn succeeds on first try', async () => {
    const fn = jest.fn().mockResolvedValue('ok');
    await expect(retry(fn, 3)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries the specified number of times on failure', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValue('success');
    await expect(retry(fn, 3)).resolves.toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws the last error if all attempts fail', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('fail'));
    await expect(retry(fn, 2)).rejects.toThrow('fail');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('waits the specified delay between attempts', async () => {
    jest.useFakeTimers();
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok');
    const promise = retry(fn, 2, 1000);
    expect(fn).toHaveBeenCalledTimes(1);
    await Promise.resolve(); // allow catch to run
    jest.advanceTimersByTime(1000);
    await promise;
    expect(fn).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });
});
