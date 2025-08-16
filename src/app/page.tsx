import { fetchBooksData } from '@/api/fetchBooksData';
import { MainPage } from '../pages/main-page/MainPage';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { FC } from 'react';

interface Props {
  searchParams: Promise<{
    searchTerm?: string;
    currentPage?: string;
  }>;
}

const Page: FC<Props> = async ({ searchParams }) => {
  const { searchTerm = '', currentPage = '1' } = await searchParams;

  const { booksList, totalItems } = await fetchBooksData(
    searchTerm,
    Number(currentPage),
    ITEMS_PER_PAGE
  );

  return <MainPage initialBooks={booksList} initialTotalItems={totalItems} />;
};

export default Page;
