import { IBookItemResponse } from '@/sources/interfaces';

export function isIBookItemResponse(data: unknown): data is IBookItemResponse {
  return typeof data === 'object' && data !== null && 'title' in data;
}
