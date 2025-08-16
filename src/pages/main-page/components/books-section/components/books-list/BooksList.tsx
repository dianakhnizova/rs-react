'use client';

import styles from './BooksList.module.scss';
import { messages as mainMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import { BookCard } from '../../../../../../components/book-card/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { Spinner } from '@/components/spinner/Spinner';
import { FC, useEffect, useState } from 'react';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { Popup } from '@/components/popup/Popup';
import { BookListPagination } from './book-list-pagination/BookListPagination';
import { fetchBooksData } from '@/api/fetchBooksData';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useParams, useSearchParams } from 'next/navigation';

interface Props {
  initialBooks: IBookData[];
  initialTotalItems: number;
  initialErrorMessage: string;
}

export const BooksList: FC<Props> = ({
  initialBooks,
  initialTotalItems,
  initialErrorMessage,
}) => {
  const { navigateToBookDetail, navigateToPage } = useNavigationToPath();
  const [books, setBooks] = useState<IBookData[]>(initialBooks ?? []);
  const [totalItems, setTotalItems] = useState<number>(initialTotalItems ?? 0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const params = useParams<{ page: string; id: string }>();
  const searchParams = useSearchParams();

  const currentPage = Number(params?.page ?? 1);
  const currentSearch = searchParams?.get('searchTerm') ?? '';

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);

      try {
        const { booksList, totalItems } = await fetchBooksData(
          currentSearch,
          currentPage,
          ITEMS_PER_PAGE
        );

        setBooks(booksList);
        setTotalItems(totalItems ?? 0);
        setErrorMessage('');
      } catch (error: unknown) {
        setErrorMessage(
          error instanceof Error ? error.message : sourceMessages.errorMessage
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadBooks();
  }, [currentPage, currentSearch]);

  return (
    <>
      <Spinner isLoading={isLoading} />

      <Popup isOpen={!!errorMessage} isError error={errorMessage} />

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
            void navigateToPage(page, currentSearch);
          }}
        />
      )}
    </>
  );
};
