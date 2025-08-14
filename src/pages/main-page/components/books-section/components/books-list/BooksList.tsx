'use client';

import styles from './BooksList.module.scss';
import { messages as mainMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import { BookCard } from '../../../../../../components/book-card/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { Spinner } from '@/components/spinner/Spinner';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import {
  selectCurrentPage,
  selectTotalItems,
} from '@/store/slices/pagination/selectors';
import { selectSearchTerm } from '@/store/slices/search/selectors';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { Popup } from '@/components/popup/Popup';
import { BookListPagination } from './book-list-pagination/BookListPagination';
import { fetchBooksData } from '@/api/fetchBooksData';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useActions } from '@/utils/hooks/useActions';

export const BooksList: FC = () => {
  const { navigateToBookDetail, navigateToPage } = useNavigationToPath();
  const [books, setBooks] = useState<IBookData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const searchTerm = useAppSelector(selectSearchTerm);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalItems = useAppSelector(selectTotalItems);
  const { setTotalItems, setCurrentPage } = useActions();

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);

      try {
        const { booksList, totalItems } = await fetchBooksData(
          searchTerm,
          currentPage,
          ITEMS_PER_PAGE
        );

        setBooks(booksList);
        setTotalItems(totalItems);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : sourceMessages.errorMessage;

        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadBooks();
  }, [searchTerm, currentPage]);

  return (
    <>
      <Spinner isLoading={isLoading} />

      <Popup
        isOpen={!!errorMessage}
        isError
        error={getErrorMessage(errorMessage)}
      />

      {books.length === 0 ? (
        <p className={styles.title}>{mainMessages.emptyList}</p>
      ) : (
        <ul className={styles.booksContainer}>
          {books.map((book: IBookData) => (
            <BookCard
              key={book.id}
              book={book}
              to={navigateToBookDetail(book.id)}
              isSelected
            />
          ))}
        </ul>
      )}

      {books.length > 0 && (
        <BookListPagination
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={page => {
            setCurrentPage(page);
            void navigateToPage(page);
          }}
        />
      )}
    </>
  );
};
