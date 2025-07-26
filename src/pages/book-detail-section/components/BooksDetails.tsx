import { BookCard } from '@/components/books-cards/BookCard';
import { BookData } from '@/sources/types';
import { useState, useEffect } from 'react';
import { bookService } from '@/api/services/booksService';
import { messages } from './messages';
import styles from './BooksDetails.module.scss';

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
    <div className={styles.container}>
      {book && (
        <BookCard
          key={book.id}
          details={[
            {
              value: book.description || messages.titleNotDescription,
              className: 'description',
            },
            {
              value: book.authors || messages.titleNotAuthor,
              className: 'authors',
            },
            {
              value: book.year || messages.titleNotPageCount,
              className: 'year',
            },
            {
              value: book.printType || messages.titleNotPrintType,
              className: 'printType',
            },
          ]}
        />
      )}
    </div>
  );
};
