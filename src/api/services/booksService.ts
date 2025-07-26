import type {
  IBookItemResponse,
  IBooksListResponse,
} from '@/sources/interfaces';
import type { BookData } from '@/sources/types';
import type { AxiosResponse } from 'axios';
import { booksApi } from '../axios';
import { BOOKS_API_KEY } from '@/sources/constants';

export const bookService = {
  getBooksList: async (
    query: string,
    page: number,
    pageItemsResults: number
  ): Promise<{ books: BookData[]; totalItems: number }> => {
    const trimmedQuery = query.trim();
    const startIndex = (page - 1) * pageItemsResults;

    const searchQuery = trimmedQuery ? `intitle:${trimmedQuery}` : 'book';

    const response: AxiosResponse<IBooksListResponse> = await booksApi.get(
      `?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${pageItemsResults}&langRestrict=en&key=${BOOKS_API_KEY}`
    );

    const booksResult = response.data.items || [];

    const booksList: BookData[] = booksResult
      .filter(book => book.volumeInfo)
      .map(book => ({
        id: book.id,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || '',
        image:
          book.volumeInfo.imageLinks?.thumbnail?.replace(/^http:/, 'https:') ||
          '',
      }));

    const totalItems = response.data.totalItems || 0;

    return { books: booksList, totalItems };
  },

  getBookById: async (id: string): Promise<BookData> => {
    const response: AxiosResponse<IBookItemResponse> = await booksApi.get(
      `/${id}?key=${BOOKS_API_KEY}`
    );

    const book = response.data;

    return {
      id: book.id,
      description: book.volumeInfo.description || '',
      authors: book.volumeInfo.authors || '',
      pageCount: book.volumeInfo.pageCount,
      printType: book.volumeInfo.printType || '',
    };
  },
};
