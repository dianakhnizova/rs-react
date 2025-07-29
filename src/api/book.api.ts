import { IBookData, IBookItemResponse } from '@/sources/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformGetBookListResponse } from './utils/transformGetBookListResponse';
import { fetchAuthorNames } from './utils/fetchAuthorNames';
import { transformGetBookByIdResponse } from './utils/transformGetBookByIdResponse';
import { messages as sourceMessages } from '@/sources/messages';

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

      transformResponse: transformGetBookListResponse,
      transformErrorResponse: response => {
        if ('status' in response && response.status === 'FETCH_ERROR') {
          return { message: sourceMessages.errorMessage };
        }

        const data = response.data as { message?: string };
        return { message: data?.message ?? sourceMessages.errorMessage };
      },
    }),

    getBookById: builder.query<IBookData, string>({
      async queryFn(id, api, _, baseQuery) {
        const bookResponse = await baseQuery(`/works/${id}.json`);

        if (bookResponse.error) return { error: bookResponse.error };

        const book = bookResponse.data as IBookItemResponse;
        const authorKeys =
          book.authors?.map(a => a.author.key.replace('/authors/', '')) || [];

        const authorNames = await fetchAuthorNames(authorKeys, baseQuery, api);

        const bookData = transformGetBookByIdResponse(book, authorNames);

        return { data: bookData };
      },
    }),
  }),
});

export const { useGetBooksListQuery, useGetBookByIdQuery } = bookApi;
