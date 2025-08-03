import { IBookData } from '@/sources/interfaces';
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import { fetchAuthorNames } from './fetchAuthorNames';
import { transformGetBookByIdResponse } from './transformGetBookByIdResponse';
import { isIBookItemResponse } from '@/utils/typeGuard';

export const getBookByIdQueryFn = async (
  id: string,
  api: BaseQueryApi,
  _extraOptions: unknown,
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
): Promise<
  QueryReturnValue<IBookData, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
  const bookResponse = await baseQuery(`/works/${id}.json`, api, {});

  if (
    bookResponse.error ||
    !bookResponse.data ||
    !isIBookItemResponse(bookResponse.data)
  ) {
    return {
      error: bookResponse.error || {
        status: 'CUSTOM_ERROR',
        error: 'No book data available',
        data: 'No book data',
      },
    };
  }

  const book = bookResponse.data;
  const authorKeys = book.authors?.map(({ author }) => author.key) || [];

  const authorNames = await fetchAuthorNames(authorKeys, baseQuery, api);

  const bookData = transformGetBookByIdResponse(book, authorNames);

  return { data: bookData };
};
