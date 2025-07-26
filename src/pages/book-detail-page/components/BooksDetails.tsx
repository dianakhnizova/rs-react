import { BookCard } from '@/components/books-cards/BookCard';
import styles from './BooksDetails.module.scss';
import { BookData } from '@/sources/types';
import { useState, useEffect } from 'react';
import { bookService } from '@/api/services/booksService';
import { messages } from './messages';

interface Props {
  bookId: string;
}

export const BooksDetails = ({ bookId }: Props) => {
  const [book, setBook] = useState<BookData | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      const detailBooks = await bookService.getBookById(bookId);
      setBook(detailBooks);
    };

    void loadBook();
  }, [bookId]);

  return (
    <div className={styles.detailContainer}>
      {book && (
        <BookCard
          key={book.id}
          id={book.id}
          details={[
            {
              value: book.description || messages.titleNotDescription,
              className: styles.description,
            },
            {
              value: book.authors || messages.titleNotAuthor,
              className: styles.authors,
            },
            {
              value: book.pageCount || messages.titleNotPageCount,
              className: styles.pageCount,
            },
            {
              value: book.printType || messages.titleNotPrintType,
              className: styles.printType,
            },
          ]}
        />
      )}
    </div>
  );
};
