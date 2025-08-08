import { IBookData } from '@/sources/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformGetBookListResponse } from './utils/transformGetBookListResponse';
import { BooksListResponse } from '@/sources/types';
import { buildBooksListQuery } from './utils/buildBooksListQuery';
import { getBookByIdQueryFn } from './utils/getBookByIdQueryFn';
import { getBaseUrl } from './utils/getBaseUrl';
import { BookApiTags } from '@/sources/enums';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
  }),
  tagTypes: Object.values(BookApiTags),

  endpoints: builder => ({
    getBooksList: builder.query<
      BooksListResponse,
      { query: string; page: number; limit?: number }
    >({
      query: buildBooksListQuery,
      transformResponse: transformGetBookListResponse,
      providesTags: [BookApiTags.BOOKS],
    }),

    getBookById: builder.query<IBookData, string>({
      queryFn: getBookByIdQueryFn,
      providesTags: [BookApiTags.BOOKS],
    }),
  }),
});

export const { useGetBooksListQuery, useGetBookByIdQuery } = bookApi;
