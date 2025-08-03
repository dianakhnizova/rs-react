import { describe, it, expect, vi } from 'vitest';
import { getBaseUrl } from '../getBaseUrl';
import { OPEN_LIBRARY_URL } from '@/sources/constants';

vi.mock('import.meta', () => ({
  meta: {
    env: {
      VITE_API_URL: undefined,
    },
  },
}));

describe('getBaseUrl', () => {
  it('Returns VITE_API_URL when it is defined', () => {
    vi.stubEnv('VITE_API_URL', 'https://custom-api.com');

    const result = getBaseUrl();

    expect(result).toBe('https://custom-api.com');

    vi.unstubAllEnvs();
  });

  it('Returns OPEN_LIBRARY_URL when VITE_API_URL is not defined', () => {
    vi.stubEnv('VITE_API_URL', '');

    const result = getBaseUrl();

    expect(result).toBe(OPEN_LIBRARY_URL);
  });
});
