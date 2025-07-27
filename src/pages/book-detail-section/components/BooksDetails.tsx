import { BookCard } from '@/components/books-cards/BookCard';
import { BookData } from '@/sources/types';
import { useState, useEffect } from 'react';
import { bookService } from '@/api/services/booksService';
import { messages } from './messages';
import styles from './BooksDetails.module.scss';
import { PagePath } from '@/router/enums';
import { useNavigate, useParams } from 'react-router-dom';

export const BooksDetails = () => {
  const [book, setBook] = useState<BookData | null>(null);

  const navigate = useNavigate();

  const { detailsId } = useParams();

  useEffect(() => {
    const loadBook = async () => {
      if (!detailsId) {
        return;
      }

      const detailBook = await bookService.getBookById(detailsId);

      if (!detailBook) {
        void navigate(PagePath.notFound);
        return;
      }

      setBook(detailBook);
    };

    void loadBook();
  }, [detailsId, navigate]);

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
