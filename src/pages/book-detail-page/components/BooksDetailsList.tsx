import { BookCard } from '@/components/books-cards/BookCard';
import styles from './BooksDetailsList.module.scss';
import { BookData } from '@/sources/types';
import { useState, useEffect } from 'react';
import { fetchBookById } from '@/api/fetchBookById';

interface Props {
  bookId: string;
}

export const BooksDetails = ({ bookId }: Props) => {
  const [book, setBook] = useState<BookData | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      const detailBooks = await fetchBookById(bookId);
      setBook(detailBooks);
    };

    void loadBook();
  }, [bookId]);

  return (
    <ul className={styles.detailContainer}>
      {book && (
        <BookCard
          key={book.id}
          id={book.id}
          description={book.description}
          image={book.image}
        />
      )}
    </ul>
  );
};
