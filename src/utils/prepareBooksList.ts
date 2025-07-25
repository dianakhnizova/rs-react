import type { BookData } from '@/sources/types';
import { messages } from '@/sources/messages';

export const prepareBooksList = (booksList: BookData[]): BookData[] => {
  const books = booksList.map(book => {
    const id = book.id;
    const title = book.title?.toUpperCase() || messages.notFoundDataTitle;

    return {
      id,
      title,
    };
  });

  return books;
};
