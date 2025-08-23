export const WRAPPER_ROOT_PORTAL_ID = 'root-portal';
export const MAX_SIZE_IMAGE = 5;
export const ONE_MB = 1024 * 1024;
export const PASSWORD_REGEX = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  DIGIT: /[0-9]/,
  SPECIAL: /[!@#$%^&*(),.?":{}|<>]/,
} as const;
export const NAME_REGEX = /^[A-ZА-ЯЁ]/;
