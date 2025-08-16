import { IBookItemResponse, IBooksListResponse } from '@/sources/interfaces';

export function isIBookItemResponse(data: unknown): data is IBookItemResponse {
  return typeof data === 'object' && data !== null && 'title' in data;
}

export function isIBooksListResponse(
  data: unknown
): data is IBooksListResponse {
  if (typeof data !== 'object' || data === null) return false;

  const maybeData = data as Record<string, unknown>;

  return (
    'docs' in maybeData &&
    Array.isArray(maybeData.docs) &&
    'numFound' in maybeData &&
    typeof maybeData.numFound === 'number'
  );
}
