import { fetchBooksData } from '@/api/fetchBooksData';
import { MainPage } from '../pages/main-page/MainPage';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { FC } from 'react';
import { IBookData } from '@/sources/interfaces';
import { messages as sourceMessages } from '@/sources/messages';

interface Props {
  searchParams: Promise<{
    searchTerm?: string;
    page?: string;
  }>;
}

const Page: FC<Props> = async ({ searchParams }) => {
  const { searchTerm = '', page = '1' } = await searchParams;
  let booksList: IBookData[] = [];
  let totalItems = 0;
  const errorMessage = '';
  try {
    const result = await fetchBooksData(
      searchTerm,
      Number(page),
      ITEMS_PER_PAGE
    );

    booksList = result.booksList;
    totalItems = result.totalItems;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : sourceMessages.errorMessage;

    console.log(message);
  }

  return (
    <MainPage
      initialBooks={booksList}
      initialTotalItems={totalItems}
      initialErrorMessage={errorMessage}
    />
  );
};

export default Page;
