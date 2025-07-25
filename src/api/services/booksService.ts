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
import { isApiErrorResponse } from '@/utils/isApiErrorResponse';

export const bookService = {
  getBooksList: async (
    query: string,
    page: number,
    pageItemsResults: number
  ): Promise<{ books: BookData[]; totalItems: number }> => {
    const trimmedQuery = query.trim();
    const startIndex = (page - 1) * pageItemsResults;

    try {
      const searchQuery = trimmedQuery ? `intitle:${query.trim()}` : 'book';

      const response: AxiosResponse<IBooksListResponse> = await booksApi.get(
        `?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${pageItemsResults}&langRestrict=en&key=${BOOKS_API_KEY}`
      );

      const booksResult: IBookItemResponse[] = Array.isArray(
        response.data.items
      )
        ? response.data.items
        : [];

      const booksList: BookData[] = booksResult
        .filter(book => book.volumeInfo)
        .map(book => ({
          id: book.id,
          title: book.volumeInfo.title,
          description: book.volumeInfo.description || '',
          image:
            book.volumeInfo.imageLinks?.thumbnail?.replace(
              /^http:/,
              'https:'
            ) || '',
        }));

      const totalItems = response.data.totalItems || 0;

      return { books: booksList, totalItems };
    } catch (error: unknown) {
      const message =
        error instanceof AxiosError && error.response?.data
          ? isApiErrorResponse(error.response.data)
            ? error.response.data.error.message
            : error.message || messages.errorMessage
          : messages.errorMessage;

      throw new Error(message);
    }
  },

  getBookById: async (id: string): Promise<BookData> => {
    try {
      const response: AxiosResponse<IBookItemResponse> = await booksApi.get(
        `/${id}?key=${BOOKS_API_KEY}`
      );

      const book = response.data;

      return {
        id: book.id,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || '',
        image:
          book.volumeInfo.imageLinks?.thumbnail?.replace(/^http:/, 'https:') ||
          '',
      };
    } catch (error: unknown) {
      const message =
        error instanceof AxiosError && error.response?.data
          ? isApiErrorResponse(error.response.data)
            ? error.response.data.error.message
            : error.message || messages.errorMessage
          : messages.errorMessage;

      throw new Error(message);
    }
  },
};
