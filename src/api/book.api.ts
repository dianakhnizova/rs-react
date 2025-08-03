import { IBookData } from '@/sources/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformGetBookListResponse } from './utils/transformGetBookListResponse';
import { BooksListResponse } from '@/sources/types';
import { buildBooksListQuery } from './utils/buildBooksListQuery';
import { getBookByIdQueryFn } from './utils/getBookByIdQueryFn';
import { getBaseUrl } from './utils/getBaseUrl';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
  }),
  endpoints: builder => ({
    getBooksList: builder.query<
      BooksListResponse,
      { query: string; page: number; limit?: number }
    >({
      query: buildBooksListQuery,
      transformResponse: transformGetBookListResponse,
    }),

    getBookById: builder.query<IBookData, string>({
      queryFn: getBookByIdQueryFn,
    }),
  }),
});

export const { useGetBooksListQuery, useGetBookByIdQuery } = bookApi;
