import { fetchAuthorNames } from '../fetchAuthorNames';
import type {
  BaseQueryFn,
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { IAuthorResponse } from '@/sources/interfaces';
import { vi } from 'vitest';

describe('fetchAuthorNames', () => {
  const mockApi = {} as BaseQueryApi;

  it('Should return author names when baseQuery succeeds', async () => {
    const mockAuthorKeys = ['/authors/A1', '/authors/A2'];

    const mockBaseQuery: BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError
    > = vi
      .fn()
      .mockResolvedValueOnce({
        data: { name: 'Author One' } satisfies IAuthorResponse,
      })
      .mockResolvedValueOnce({
        data: { name: 'Author Two' } satisfies IAuthorResponse,
      });

    const result = await fetchAuthorNames(
      mockAuthorKeys,
      mockBaseQuery,
      mockApi
    );

    expect(mockBaseQuery).toHaveBeenCalledTimes(2);
    expect(mockBaseQuery).toHaveBeenNthCalledWith(
      1,
      '/authors/A1.json',
      mockApi,
      {}
    );
    expect(mockBaseQuery).toHaveBeenNthCalledWith(
      2,
      '/authors/A2.json',
      mockApi,
      {}
    );
    expect(result).toEqual(['Author One', 'Author Two']);
  });

  it('Should skip entries without data or name', async () => {
    const mockAuthorKeys = ['/authors/A1', '/authors/A2'];

    const mockBaseQuery: BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError
    > = vi
      .fn()
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({
        data: { name: 'Author Two' } satisfies IAuthorResponse,
      });

    const result = await fetchAuthorNames(
      mockAuthorKeys,
      mockBaseQuery,
      mockApi
    );

    expect(result).toEqual(['Author Two']);
  });

  it('Should return empty array if no valid names', async () => {
    const mockAuthorKeys = ['/authors/A1', '/authors/A2'];

    const mockBaseQuery: BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError
    > = vi.fn().mockResolvedValue({});

    const result = await fetchAuthorNames(
      mockAuthorKeys,
      mockBaseQuery,
      mockApi
    );

    expect(result).toEqual([]);
  });
});
