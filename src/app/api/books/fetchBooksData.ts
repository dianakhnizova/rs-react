import { prepareBooksList } from '@/utils/prepareBooksList';
import { bookService } from './services/booksService';

export const fetchBooksData = async (
  searchTerm: string,
  page: number,
  pageItemsResults: number
) => {
  const { books, totalItems } = await bookService.getBooksList(
    searchTerm,
    page,
    pageItemsResults
  );
  const booksList = prepareBooksList(books);

  return { booksList, totalItems };
};
