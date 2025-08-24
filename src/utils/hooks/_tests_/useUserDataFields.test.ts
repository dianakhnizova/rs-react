import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

import { useSelector } from 'react-redux';
import { useUserDataFields } from '../useUserDataFields';

describe('useUserDataFields (hook)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty array when no user data', () => {
    (useSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue([]);

    const { result } = renderHook(() => useUserDataFields());

    expect(result.current).toEqual([]);
  });

  it('maps user data into labeled fields', () => {
    (useSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      {
        name: 'Alice',
        age: '25',
        email: 'alice@mail.com',
        password: 'secret123',
        confirmPassword: 'secret123',
        gender: 'female',
        country: 'USA',
        file: 'avatar.png',
        acceptTerms: true,
      },
    ]);

    const { result } = renderHook(() => useUserDataFields());

    expect(result.current).toHaveLength(1);
    expect(result.current[0][0]).toMatchObject({
      label: 'Name',
      data: 'Alice',
    });
    expect(result.current[0][8]).toMatchObject({
      label: 'I accept the terms',
      data: 'Yes',
    });
  });

  it('sets empty string when acceptTerms is false', () => {
    (useSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      {
        name: 'Bob',
        age: '30',
        email: 'bob@mail.com',
        password: 'pass123',
        confirmPassword: 'pass123',
        gender: 'male',
        country: 'Canada',
        file: null,
        acceptTerms: false,
      },
    ]);

    const { result } = renderHook(() => useUserDataFields());

    expect(result.current[0][8]).toEqual({
      label: 'I accept the terms',
      data: '',
    });
  });
});
