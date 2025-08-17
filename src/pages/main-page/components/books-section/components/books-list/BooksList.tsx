'use client';

import styles from './BooksList.module.scss';
import { BookCard } from '../../../../../../components/book-card/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { FC, useEffect, useState } from 'react';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { BookListPagination } from './book-list-pagination/BookListPagination';
import { useParams, useSearchParams } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { fetchBooksData } from '@/app/api/books/fetchBooksData';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/spinner/Spinner';
import { Popup } from '@/components/popup/Popup';

interface Props {
  initialBooks: IBookData[];
  initialTotalItems: number;
}

export const BooksList: FC<Props> = ({ initialBooks, initialTotalItems }) => {
  const s = useTranslations('Sources');

  const { navigateToBookDetail, navigateToPage } = useNavigationToPath();

  const [books, setBooks] = useState<IBookData[]>(initialBooks);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [totalItems, setTotalItems] = useState(initialTotalItems);

  const params = useParams<{ page: string; id: string }>();
  const searchParams = useSearchParams();

  const currentPage = Number(params?.page ?? 1);
  const currentSearch = searchParams?.get('searchTerm') ?? '';

  useEffect(() => {
    const loadBooksList = async () => {
      setIsLoading(true);

      try {
        const { booksList, totalItems } = await fetchBooksData(
          currentSearch,
          currentPage,
          ITEMS_PER_PAGE
        );
        setBooks(booksList);
        setTotalItems(totalItems);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : s('errorMessage');

        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadBooksList();
  }, [currentPage, currentSearch]);

  return (
    <>
      {books.length === 0 ? (
        <p className={styles.title}>{s('emptyList')}</p>
      ) : (
        <>
          <Spinner isLoading={isLoading} />

          <Popup isOpen={!!errorMessage} isError>
            <p className={styles.error}>{errorMessage}</p>
          </Popup>

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
        </>
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
