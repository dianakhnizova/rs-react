// src/api/book.api.test.ts

import { buildBooksListQuery } from './utils/buildBooksListQuery';

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
});
