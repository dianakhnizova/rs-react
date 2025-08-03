import { ITEMS_PER_PAGE } from '@/sources/constants';
import { buildBooksListQuery } from '../buildBooksListQuery';

describe('buildBooksListQuery', () => {
  it('Should generate correct query with all params', () => {
    const result = buildBooksListQuery({
      query: 'hello',
      page: 2,
      limit: 15,
    });

    expect(result).toEqual({
      url: '/search.json',
      params: {
        title: 'hello',
        page: 2,
        limit: 15,
      },
    });
  });

  it('Should fallback to default title and limit', () => {
    const result = buildBooksListQuery({
      query: '   ',
      page: 1,
    });

    expect(result).toEqual({
      url: '/search.json',
      params: {
        title: 'fiction',
        page: 1,
        limit: ITEMS_PER_PAGE,
      },
    });
  });
});
