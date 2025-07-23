import { bookService } from './services/booksService';
import { prepareBooksList } from '@/utils/prepareBooksList';

export const fetchBooksData = async (searchTerm: string) => {
  const books = await bookService.getBooksList(searchTerm);
  const booksList = prepareBooksList(books);

  return booksList;
};
