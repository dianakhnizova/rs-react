import { describe, it, expect } from 'vitest';
import { countryReducer } from './country.slice';

describe('country.slice', () => {
  it('should return initial state', () => {
    const state = countryReducer(undefined, { type: 'unknown' });
    expect(state.countries.length).toBeGreaterThan(0);
  });
});
