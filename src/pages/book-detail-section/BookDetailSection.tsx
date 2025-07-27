import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import { Button } from '@/components/button/Button';
import { BookData } from '@/sources/types';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookService } from '@/api/services/booksService';
import { Spinner } from '@/components/spinner/Spinner';

export const BookDetailSection = () => {
  const { currentPage, navigateToList, redirectToNotFound } =
    useNavigationToPath();
  const [bookDetails, setBookDetails] = useState<BookData | null>(null);
  const [isBookLoading, setIsBookLoading] = useState<boolean>(false);

  const { detailsId } = useParams();

  useEffect(() => {
    const loadBookDetails = async () => {
      if (!detailsId) {
        setBookDetails(null);
        return;
      }

      setIsBookLoading(true);

      try {
        const detailBook = await bookService.getBookById(detailsId);

        setBookDetails(detailBook);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : sourceMessages.errorMessage;

        console.log(message);
      } finally {
        setIsBookLoading(false);
      }
    };

    void loadBookDetails();
  }, [detailsId, redirectToNotFound]);

  const handleCloseButton = () => {
    navigateToList(currentPage);
  };

  return (
    <section className={styles.container}>
      <Spinner isLoading={isBookLoading} data-testid="spinner" />

      {!bookDetails && !isBookLoading && (
        <p className={styles.error}>
          {bookDetailsPageMessages.notFoundIdTitle}
        </p>
      )}

      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      <Button onClick={handleCloseButton}>
        {bookDetailsPageMessages.closeButton}
      </Button>
    </section>
  );
};
