import type { BookData } from '@/sources/types';

export const prepareDetailBook = (detail: BookData): BookData => ({
  id: detail.id,
  description: detail.description,
  authors: detail.authors,
  pageCount: detail.pageCount,
  printType: detail.printType,
});
