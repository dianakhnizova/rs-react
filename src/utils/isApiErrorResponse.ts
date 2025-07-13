import type { IApiErrorResponse } from '@/sources/interfaces';

export const isApiErrorResponse = (
  data: unknown
): data is IApiErrorResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    typeof data.error === 'object' &&
    data.error !== null &&
    'message' in data.error &&
    typeof data.error.message === 'string'
  );
};
