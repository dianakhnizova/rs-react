import { prepareDetailBook } from '@/utils/prepareDetailBook';
import { bookService } from './services/booksService';

export const fetchBookById = async (id: string) => {
  const book = await bookService.getBookById(id);
  const details = prepareDetailBook(book);

  return details;
};
