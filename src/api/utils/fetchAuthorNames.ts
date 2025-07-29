import type {
  BaseQueryFn,
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { IAuthorResponse } from '@/sources/interfaces';

export const fetchAuthorNames = async (
  authorKeys: string[],
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  api: BaseQueryApi
): Promise<string[]> => {
  const names = await Promise.all(
    authorKeys.map(async key => {
      const response = await baseQuery(`/authors/${key}.json`, api, {});
      if (response.data) {
        const author = response.data as IAuthorResponse;
        return author.name;
      }
      return '';
    })
  );

  return names.filter(Boolean);
};
