export type PasswordStrength = 'weak' | 'medium' | 'strong';

export function getPasswordStrength(password: string): PasswordStrength {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength === 3 || strength === 4) return 'medium';
  return 'strong';
}
