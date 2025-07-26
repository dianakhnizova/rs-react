import { BookCard } from '@/components/books-cards/BookCard';
import { BookData } from '@/sources/types';
import { useState, useEffect } from 'react';
import { bookService } from '@/api/services/booksService';
import { messages } from './messages';
import styles from './BooksDetails.module.scss';
import { PagePath } from '@/router/enums';
import { useNavigate } from 'react-router-dom';

interface Props {
  bookId: string;
}

export const BooksDetails = ({ bookId }: Props) => {
  const [book, setBook] = useState<BookData | null>(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBook = async () => {
      const detailBook = await bookService.getBookById(bookId);

      if (!detailBook) {
        void navigate(PagePath.notFound);
        setError(true);
        return;
      }

      setBook(detailBook);
    };

    void loadBook();
  }, [bookId, navigate]);

  if (error) {
    return <p className={styles.error}>{messages.titleNotBook}</p>;
  }

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
