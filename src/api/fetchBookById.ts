import { bookService } from './services/booksService';

export const fetchBookById = async (id: string) => {
  const details = await bookService.getBookById(id);

  return details;
};
