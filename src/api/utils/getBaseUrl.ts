import { OPEN_LIBRARY_URL } from '@/sources/constants';

export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || OPEN_LIBRARY_URL;
};
