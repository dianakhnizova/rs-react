import { messages } from '@/sources/messages';
import { bookService } from './services/booksService';
import { prepareBooksList } from '@/utils/prepareBooksList';

export const fetchBooksData = async (searchTerm: string) => {
  try {
    const books = await bookService.getBooksList(searchTerm);
    const booksList = prepareBooksList(books);

    return booksList;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : messages.errorMessage;
    throw new Error(message);
  }
};
