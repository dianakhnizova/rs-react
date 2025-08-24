import { describe, it, expect } from 'vitest';
import { PasswordStrength } from '@/sources/enums';
import { getPasswordStrength } from '../getPasswordStrength';

describe('getPasswordStrength', () => {
  it('correctly evaluates password strength', () => {
    expect(getPasswordStrength('abc')).toBe(PasswordStrength.WEAK);
    expect(getPasswordStrength('1234567')).toBe(PasswordStrength.WEAK);

    expect(getPasswordStrength('abcdefG1')).toBe(PasswordStrength.MEDIUM);
    expect(getPasswordStrength('Abcdef12')).toBe(PasswordStrength.MEDIUM);

    expect(getPasswordStrength('Abcdef12!')).toBe(PasswordStrength.STRONG);
    expect(getPasswordStrength('StrongPass123$')).toBe(PasswordStrength.STRONG);
  });
});
