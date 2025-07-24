import { useEffect, useState } from 'react';
import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../books-cards/BookCard';
import type { BookData } from '@/sources/types';
import { fetchBooksData } from '@/api/fetchBooksData';
import { Pagination } from '@/components/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

export interface Props {
  searchTerm: string;
  setLoading: (value: boolean) => void;
  onClose: () => void;
  isLoading: boolean;
  setError: (message: string) => void;
}

export const BooksList = ({ searchTerm, setLoading, setError }: Props) => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalItems, setTotalItems] = useState(0);

  const pageItemsResults = 5;
  const totalPages = Math.ceil(totalItems / pageItemsResults);
  const pageFromURL = Number.parseInt(searchParams.get('page') || '1', 10);
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
          pageItemsResults
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

  useEffect(() => {
    setSearchParams({ page: '1' });
  }, [searchTerm]);

  return (
    <>
      {books.length === 0 ? (
        <p className={styles.title}>{messages.emptyList}</p>
      ) : (
        <ul className={styles.booksContainer}>
          {books.map((book: BookData) => (
            <BookCard
              key={book.id}
              name={book.title}
              description={book.description}
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
