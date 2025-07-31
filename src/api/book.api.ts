import { IBookData, IBookItemResponse } from '@/sources/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformGetBookListResponse } from './utils/transformGetBookListResponse';
import { fetchAuthorNames } from './utils/fetchAuthorNames';
import { transformGetBookByIdResponse } from './utils/transformGetBookByIdResponse';
import { BooksListResponse } from '@/sources/types';
import { ITEMS_PER_PAGE } from '@/sources/constants';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getBooksList: builder.query<
      BooksListResponse,
      { query: string; page: number; limit?: number }
    >({
      query: ({ query, page, limit = ITEMS_PER_PAGE }) => ({
        url: '/books',
        params: {
          title: query.trim() || 'fiction',
          page,
          limit,
        },
      }),

      transformResponse: transformGetBookListResponse,
    }),

    getBookById: builder.query<IBookData, string>({
      async queryFn(id, api, _, baseQuery) {
        const bookResponse = await baseQuery(`/works/${id}.json`);

        if (bookResponse.error) return { error: bookResponse.error };

        const book = bookResponse.data as IBookItemResponse;
        const authorKeys = book.authors?.map(({ author }) => author.key) || [];

        const authorNames = await fetchAuthorNames(authorKeys, baseQuery, api);

        const bookData = transformGetBookByIdResponse(book, authorNames);

        return { data: bookData };
      },
    }),
  }),
});

export const { useGetBooksListQuery, useGetBookByIdQuery } = bookApi;
