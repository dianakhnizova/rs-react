import { OPEN_LIBRARY_COVER_URL } from '@/sources/constants';
import {
  IAuthorResponse,
  IBookData,
  IBookItemResponse,
  IBooksListResponse,
} from '@/sources/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getBooksList: builder.query<
      { books: IBookData[]; totalItems: number },
      { query: string; page: number; limit: number }
    >({
      query: ({ query, page, limit }) => ({
        url: '/books',
        params: {
          title: query.trim() || 'fiction',
          page,
          limit,
        },
      }),

      transformResponse: (response: IBooksListResponse) => {
        const booksList: IBookData[] = response.docs.map(book => ({
          id: book.key.replace('/works/', ''),
          title: book.title,
          image: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : '',
        }));

        return { books: booksList, totalItems: response.numFound ?? 0 };
      },
    }),

    getBookById: builder.query<IBookData, string>({
      async queryFn(id, _queryApi, _extraOptions, baseQuery) {
        const bookResponse = await baseQuery(`/works/${id}.json`);
        if (bookResponse.error) return { error: bookResponse.error };

        const book = bookResponse.data as IBookItemResponse;
        const authorKeys = book.authors?.map(a => a.author.key) || [];

        const authorNames: string[] = [];
        for (const key of authorKeys) {
          const response = await baseQuery(`/authors${key}.json`);
          if (response.data) {
            const author = response.data as IAuthorResponse;
            authorNames.push(author.name);
          }
        }

        const bookData: IBookData = {
          id: book.key.replace('/works/', ''),
          title: book.title || '',
          image: book.covers?.[0]
            ? `${OPEN_LIBRARY_COVER_URL}/${book.covers[0]}-M.jpg`
            : '',
          description:
            typeof book.description === 'object'
              ? book.description?.value
              : book.description || '',
          authors: authorNames.filter(Boolean).join(', '),
          year: book.first_publish_date || '',
          printType: 'book',
        };

        return { data: bookData };
      },
    }),
  }),
});

export const { useGetBooksListQuery, useGetBookByIdQuery } = bookApi;
