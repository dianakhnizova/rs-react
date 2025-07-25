import type { BookData } from '@/sources/types';

export const prepareDetailBook = (detail: BookData): BookData => ({
  id: detail.id,
  description: detail.description,
  image: detail.image,
});
