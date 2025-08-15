import { FC } from 'react';
import { fetchBooksData } from '@/api/fetchBooksData';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { BooksList } from './BooksList';

interface Props {
  searchTerm: string;
  currentPage: number;
}

export const ServerBookList: FC<Props> = async ({
  searchTerm,
  currentPage,
}) => {
  const { booksList, totalItems } = await fetchBooksData(
    searchTerm,
    currentPage,
    ITEMS_PER_PAGE
  );

  return <BooksList initialBooks={booksList} initialTotalItems={totalItems} />;
};
