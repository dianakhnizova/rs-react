import { bookApi } from './book.api';
import { buildBooksListQuery } from './utils/buildBooksListQuery';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';

const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

describe('bookApi', () => {
  describe('getBooksList', () => {
    it('Should build correct query with all params', () => {
      const params = {
        query: 'science',
        page: 3,
        limit: 20,
      };

      const result = buildBooksListQuery(params);

      expect(result).toEqual({
        url: '/search.json',
        params: {
          title: 'science',
          page: 3,
          limit: 20,
        },
      });
    });
  });

  describe('bookApi cache behavior', () => {
    it('Should cache data and avoid refetch', async () => {
      const firstResult = await store.dispatch(
        bookApi.endpoints.getBooksList.initiate({ query: 'test', page: 1 })
      );

      expect(firstResult.data).toBeDefined();

      const secondResult = await store.dispatch(
        bookApi.endpoints.getBooksList.initiate({ query: 'test', page: 1 })
      );

      expect(secondResult.data).toBe(firstResult.data);
    });
  });

  describe('bookApi error', () => {
    it('Should handle error correctly', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ message: 'Internal Server Error' }),
        } as Response)
      ) as unknown as typeof fetch;

      const result = await store.dispatch(
        bookApi.endpoints.getBooksList.initiate({ query: 'error', page: 1 })
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();

      vi.restoreAllMocks();
    });
  });
});
