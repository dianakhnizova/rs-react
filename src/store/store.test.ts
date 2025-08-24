import { describe, it, expect } from 'vitest';
import { store } from './store';
import { userActions } from './slices/user/user.slice';

describe('Redux Store', () => {
  it('should handle user form submission', () => {
    const mockUser = {
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

    store.dispatch(userActions.addUserData(mockUser));

    const state = store.getState();
    expect(state.user.userData).toContainEqual(mockUser);
  });

  it('should clear user data', () => {
    store.dispatch(userActions.clearUserData());
    const state = store.getState();
    expect(state.user.userData).toEqual([]);
  });
});
