import { describe, it, expect } from 'vitest';
import { userReducer, userActions } from './user.slice';
import type { FullUserForm } from '@/sources/interfaces';

describe('user.slice', () => {
  const mockUser: FullUserForm = {
    name: 'Diana',
    age: '23',
    email: 'diana@mail.com',
    password: 'StrongPass123!',
    confirmPassword: 'StrongPass123!',
    gender: 'male',
    country: 'USA',
    acceptTerms: true,
    file: 'file',
  };

  it('should return initial state', () => {
    const state = userReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ userData: [] });
  });

  it('should add user data', () => {
    const state = userReducer(
      { userData: [] },
      userActions.addUserData(mockUser)
    );
    expect(state.userData).toHaveLength(1);
    expect(state.userData[0]).toEqual(mockUser);
  });

  it('should clear user data', () => {
    const state = userReducer(
      { userData: [mockUser] },
      userActions.clearUserData()
    );
    expect(state.userData).toEqual([]);
  });
});
