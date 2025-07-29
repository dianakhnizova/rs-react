import type { IBookData } from '@/sources/interfaces';
import { messages } from '@/sources/messages';
import ImgPlaceholder from '@/assets/img-placeholder.jpg';

export const prepareBooksList = (booksList: IBookData[]): IBookData[] => {
  const books = booksList.map(book => {
    const id = book.id;
    const title = book.title?.toUpperCase() || messages.notFoundDataTitle;
    const image = book.image || ImgPlaceholder;

    return {
      id,
      title,
      image,
    };
  });

  return books;
};
