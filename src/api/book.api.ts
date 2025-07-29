import { IBookData, IBooksListResponse } from '@/sources/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/books' }),
  endpoints: builder => ({
    getBooksList: builder.query<
      { books: IBookData[]; totalItems: number },
      { query: string; page: number; limit: number }
    >({
      query: ({ query, page, limit }) => ({
        url: '/',
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
  }),
});

export const { useGetBooksListQuery } = bookApi;
