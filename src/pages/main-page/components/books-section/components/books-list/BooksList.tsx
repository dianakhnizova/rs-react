'use client';

import styles from './BooksList.module.scss';
import { messages as mainMessages } from './messages';
import { BookCard } from '../../../../../../components/book-card/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { FC, useEffect, useState } from 'react';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { BookListPagination } from './book-list-pagination/BookListPagination';
import { useParams, useSearchParams } from 'next/navigation';
import { fetchBooksData } from '@/api/fetchBooksData';
import { ITEMS_PER_PAGE } from '@/sources/constants';

interface Props {
  initialBooks: IBookData[];
  initialTotalItems: number;
}

export const BooksList: FC<Props> = ({ initialBooks, initialTotalItems }) => {
  const { navigateToBookDetail, navigateToPage } = useNavigationToPath();

  const [books, setBooks] = useState<IBookData[]>(initialBooks);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  const params = useParams<{ page: string; id: string }>();
  const searchParams = useSearchParams();
  const currentPage = Number(params?.page ?? 1);
  const currentSearch = searchParams?.get('searchTerm') ?? '';

  useEffect(() => {
    const loadBooksList = async () => {
      const { booksList, totalItems } = await fetchBooksData(
        currentSearch,
        currentPage,
        ITEMS_PER_PAGE
      );
      setBooks(booksList);
      setTotalItems(totalItems);
    };

    void loadBooksList();
  }, [currentPage, currentSearch]);

  return (
    <>
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
