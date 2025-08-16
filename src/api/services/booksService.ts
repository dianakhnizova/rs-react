import {
  getAuthorUrl,
  OPEN_LIBRARY_COVER_URL,
  OPEN_LIBRARY_SEARCH_URL,
  OPEN_LIBRARY_WORK_URL,
} from '@/sources/constants';
import type { IBookData, IBookItemResponse } from '@/sources/interfaces';
import { isIBookItemResponse, isIBooksListResponse } from '@/utils/typeGuard';

export const bookService = {
  getBooksList: async (
    query: string,
    page: number,
    pageItemsResults: number
  ): Promise<{ books: IBookData[]; totalItems: number }> => {
    const trimmedQuery = query.trim() || 'fiction';

    const url = new URL(OPEN_LIBRARY_SEARCH_URL);
    url.searchParams.set('title', trimmedQuery);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', String(pageItemsResults));

    const response = await fetch(url.toString());

    const data: unknown = await response.json();

    if (!isIBooksListResponse(data)) {
      return { books: [], totalItems: 0 };
    }

    const booksList: IBookData[] = Array.isArray(data?.docs)
      ? data.docs.map(book => ({
          id: book.key.replace('/works/', ''),
          title: book.title.toUpperCase(),
          image: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : '',
          bookDetails: {
            first_sentence: Array.isArray(book.first_sentence)
              ? book.first_sentence.join(' ')
              : book.first_sentence || '',
            authors: Array.isArray(book.author_name)
              ? book.author_name.map(String).join(', ')
              : '',
            first_publish_year: book.first_publish_year || '',
            pages: book.edition_count || '',
          },
        }))
      : [];

    return { books: booksList, totalItems: data.numFound || 0 };
  },

  getBookById: async (id: string): Promise<IBookData | null> => {
    const response = await fetch(`${OPEN_LIBRARY_WORK_URL}/${id}.json`);

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    if (!isIBookItemResponse(data)) {
      return null;
    }

    const book: IBookItemResponse = data;
    const authorRefs = book.authors ?? [];
    const authorKeys = authorRefs.map(({ author }) => author.key);

    const authorNames = await Promise.all(
      authorKeys.map(async (key: string) => {
        try {
          const response = await fetch(getAuthorUrl(key));
          const data: { name: string } = (await response.json()) as {
            name: string;
          };
          return data.name || '';
        } catch {
          return '';
        }
      })
    );

    return {
      id: book.key ? book.key.replace('/works/', '') : '',
      title: book.title?.toUpperCase() || '',
      image: book.covers?.[0]
        ? `${OPEN_LIBRARY_COVER_URL}/${book.covers[0]}-M.jpg`
        : '',

      bookDetails: {
        description:
          typeof book.description === 'object'
            ? book.description?.value
            : book.description || '',
        authors: authorNames.filter(Boolean).join(', '),
        first_publish_date: book.first_publish_date || '',
      },
    };
  },
};
