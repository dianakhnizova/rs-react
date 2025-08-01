import { ITEMS_PER_PAGE } from '@/sources/constants';

export const buildBooksListQuery = ({
  query,
  page,
  limit = ITEMS_PER_PAGE,
}: {
  query: string;
  page: number;
  limit?: number;
}) => ({
  url: '/books',
  params: {
    title: query.trim() || 'fiction',
    page,
    limit,
  },
});
