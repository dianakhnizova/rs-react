import { OPEN_LIBRARY_URL } from '@/sources/constants';

export const getBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || OPEN_LIBRARY_URL;
};
