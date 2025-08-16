'use client';

import styles from './BooksList.module.scss';
import { messages as mainMessages } from './messages';
import { BookCard } from '../../../../../../components/book-card/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { FC } from 'react';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { BookListPagination } from './book-list-pagination/BookListPagination';
import { useParams, useSearchParams } from 'next/navigation';

interface Props {
  initialBooks: IBookData[];
  initialTotalItems: number;
}

export const BooksList: FC<Props> = ({ initialBooks, initialTotalItems }) => {
  const { navigateToBookDetail, navigateToPage } = useNavigationToPath();

  const params = useParams<{ page: string; id: string }>();
  const searchParams = useSearchParams();

  const currentPage = Number(params?.page ?? 1);
  const currentSearch = searchParams?.get('searchTerm') ?? '';

  return (
    <>
      {initialBooks.length === 0 ? (
        <p className={styles.title}>{mainMessages.emptyList}</p>
      ) : (
        <ul className={styles.booksContainer}>
          {initialBooks.map((book: IBookData) => (
            <BookCard
              key={book.id}
              book={book}
              to={navigateToBookDetail(book.id)}
              isSelected
            />
          ))}
        </ul>
      )}

      {initialBooks.length > 0 && (
        <BookListPagination
          currentPage={currentPage}
          totalItems={initialTotalItems}
          onPageChange={page => {
            void navigateToPage(page, currentSearch);
          }}
        />
      )}
    </>
  );
};
