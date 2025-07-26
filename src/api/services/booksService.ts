import {
  getAuthorUrl,
  OPEN_LIBRARY_SEARCH_URL,
  OPEN_LIBRARY_WORK_URL,
} from '@/sources/constants';
import type {
  IBookItemResponse,
  IBooksListResponse,
} from '@/sources/interfaces';
import type { BookData } from '@/sources/types';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const bookService = {
  getBooksList: async (
    query: string,
    page: number,
    pageItemsResults: number
  ): Promise<{ books: BookData[]; totalItems: number }> => {
    const trimmedQuery = query.trim() || 'fiction';

    const response: AxiosResponse<IBooksListResponse> = await axios.get(
      OPEN_LIBRARY_SEARCH_URL,
      {
        params: {
          title: trimmedQuery,
          page,
          limit: pageItemsResults,
        },
      }
    );

    const booksResult = response.data.docs || [];

    const booksList: BookData[] = booksResult.map(book => ({
      id: book.key.replace('/works/', ''),
      title: book.title,
      image: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '',
    }));

    const totalItems = response.data.numFound || 0;

    return { books: booksList, totalItems };
  },

  getBookById: async (id: string): Promise<BookData> => {
    const response: AxiosResponse<IBookItemResponse> = await axios.get(
      `${OPEN_LIBRARY_WORK_URL}/${id}.json`
    );

    const book = response.data;
    const authorRefs = book.authors ?? [];
    const authorKeys = authorRefs.map(a => a.author.key);

    const authorNames = await Promise.all(
      authorKeys.map(async (key: string) => {
        try {
          const responce: AxiosResponse<{ name: string }> = await axios.get(
            getAuthorUrl(key)
          );
          return responce.data.name || '';
        } catch {
          return '';
        }
      })
    );

    return {
      id: book.key.replace('/works/', ''),
      title: book.title || '',
      description:
        typeof book.description === 'object' && book.description !== null
          ? book.description.value
          : book.description || '',
      authors: authorNames.filter(Boolean).join(', '),
      year: book.first_publish_date || '',
      printType: 'book',
    };
  },
};
