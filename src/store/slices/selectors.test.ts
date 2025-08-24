import { describe, it, expect } from 'vitest';
import { selectCountry } from './country/selectors';
import { selectUser } from './user/selectors';
import type { TypeRootState } from '@/store/store';

describe('selectors', () => {
  const mockState: TypeRootState = {
    country: {
      countries: [{ id: '1', name: 'Kazakhstan' }],
    },
    user: {
      userData: [
        {
          name: 'Diana',
          age: '23',
          email: 'diana@mail.com',
          password: 'StrongPass123!',
          confirmPassword: 'StrongPass123!',
          gender: 'male',
          country: 'USA',
          acceptTerms: true,
          file: 'file',
        },
      ],
    },
  };

  it('selectCountry should return countries', () => {
    expect(selectCountry(mockState)).toEqual([{ id: '1', name: 'Kazakhstan' }]);
  });

  it('selectUser should return users', () => {
    expect(selectUser(mockState)).toHaveLength(1);
  });
});
