import type { BookData } from '@/sources/types';
import { messages } from '@/sources/messages';

export const prepareBooksList = (booksList: BookData[]): BookData[] => {
  const books = booksList.map(book => {
    const id = book.id;
    const title = book.title.toUpperCase() || messages.notFoundDataTitle;
    const description = book.description;
    const image = book.image;

    return {
      id,
      title,
      description,
      image,
    };
  });

  return books;
};
