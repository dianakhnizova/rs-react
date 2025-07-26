import { useEffect, useState } from 'react';
import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../../../../../../components/books-cards/BookCard';
import type { BookData } from '@/sources/types';
import { fetchBooksData } from '@/api/fetchBooksData';
import { Pagination } from '@/components/pagination/Pagination';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { URLSearchParamsInit } from 'react-router-dom';

export interface Props {
  searchTerm: string;
  searchParams: URLSearchParams;
  setSearchParams: (next: URLSearchParamsInit) => void;
  setLoading: (value: boolean) => void;
  onClose: () => void;
  isLoading: boolean;
  setError: (message: string) => void;
}

export const BooksList = ({
  searchTerm,
  searchParams,
  setSearchParams,
  setLoading,
  setError,
}: Props) => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const pageFromURL = Number(searchParams.get('page') || '1') || 1;
  const currentPage = Math.max(1, pageFromURL);

  const handlePagination = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);

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
          error instanceof Error ? error.message : messages.errorMessage;

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void loadBooks();
  }, [searchTerm, setError, setLoading, currentPage]);

  return (
    <>
      {books.length === 0 ? (
        <p className={styles.title}>{messages.emptyList}</p>
      ) : (
        <ul className={styles.booksContainer}>
          {books.map((book: BookData) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              image={book.image}
            />
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePagination}
        totalPages={totalPages}
      />
    </>
  );
};
