import { getAuthorUrl, OPEN_LIBRARY_WORK_URL } from '@/sources/constants';
import type { IBookItemResponse } from '@/sources/interfaces';
import type { IBookData } from '@/sources/interfaces';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const bookService = {
  getBookById: async (id: string): Promise<IBookData> => {
    const response: AxiosResponse<IBookItemResponse> = await axios.get(
      `${OPEN_LIBRARY_WORK_URL}/${id}.json`
    );

    const book = response.data;
    const authorRefs = book.authors ?? [];
    const authorKeys = authorRefs.map(({ author }) => author.key);

    const authorNames = await Promise.all(
      authorKeys.map(async (key: string) => {
        try {
          const response: AxiosResponse<{ name: string }> = await axios.get(
            getAuthorUrl(key)
          );
          return response.data.name || '';
        } catch {
          return '';
        }
      })
    );

    return {
      id: book.key.replace('/works/', ''),
      title: book.title || '',
      image: book.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
        : '',

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
