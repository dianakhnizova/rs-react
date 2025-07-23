import { useEffect, useState } from 'react';
import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../books-cards/BookCard';
import type { BookData } from '@/sources/types';
import { fetchBooksData } from '@/api/fetchBooksData';

export interface Props {
  searchTerm: string;
  setLoading: (value: boolean) => void;
  onClose: () => void;
  isLoading: boolean;
  setError: (message: string) => void;
}

export const BooksList = ({ searchTerm, setLoading, setError }: Props) => {
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const books: BookData[] = await fetchBooksData(searchTerm);
        setBooks(books);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : messages.errorMessage;
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    void loadBooks();
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
    </>
  );
};
