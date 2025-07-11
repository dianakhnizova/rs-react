import type {
  IBookItemResponse,
  IBooksListResponse,
} from '@/sources/interfaces';
import type { BookData } from '@/sources/types';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { booksApi } from '../axios';
import { BOOKS_API_KEY } from '@/sources/constants';
import { messages } from '@/sources/messages';

export const bookService = {
  getBookById: async (bookId: string): Promise<BookData> => {
    try {
      const response: AxiosResponse<IBookItemResponse> = await booksApi.get(
        `${bookId}?key=${BOOKS_API_KEY}`
      );
      const book = response.data;

      return {
        id: book.id,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || '',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      };
    } catch (error: unknown) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.error?.message || error.message
          : messages.errorMessage;
      throw new Error(message);
    }
  },

  getBooksList: async (query: string): Promise<BookData[]> => {
    const trimmedQuery = query.trim();

    try {
      const searchQuery = trimmedQuery ? `intitle:${query.trim()}` : 'book';

      const response: AxiosResponse<IBooksListResponse> = await booksApi.get(
        `?q=${encodeURIComponent(searchQuery)}&maxResults=20&langRestrict=en&key=${BOOKS_API_KEY}`
      );
      const booksResult: IBookItemResponse[] = response.data.items || [];

      const booksList: BookData[] = booksResult
        .filter(book =>
          book.volumeInfo.title
            .toLowerCase()
            .includes(trimmedQuery.toLowerCase())
        )
        .map(book => ({
          id: book.id,
          title: book.volumeInfo.title,
          description: book.volumeInfo.description || '',
          image: book.volumeInfo.imageLinks?.thumbnail || '',
        }));

      return booksList;
    } catch (error: unknown) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.error?.message || error.message
          : messages.errorMessage;
      throw new Error(message);
    }
  },
};
