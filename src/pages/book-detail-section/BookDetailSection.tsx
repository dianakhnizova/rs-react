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
import { Popup } from '@/components/popup/Popup';

export const BookDetailSection = () => {
  const { currentPage, navigateToList, redirectToNotFound } =
    useNavigationToPath();
  const [bookDetails, setBookDetails] = useState<BookData | null>(null);
  const [isBookLoading, setIsBookLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

        if (!detailBook) {
          redirectToNotFound();
          return;
        }

        setBookDetails(detailBook);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : sourceMessages.errorMessage;

        setErrorMessage(message);
      } finally {
        setIsBookLoading(false);
      }
    };

    void loadBookDetails();
  }, [detailsId, redirectToNotFound]);

  const handleCloseButton = () => {
    navigateToList(currentPage);
  };

  const onClose = () => {
    setErrorMessage('');
  };

  return (
    <section className={styles.container}>
      <Popup isOpen={!!errorMessage} onClose={onClose} data-testid="popup">
        <p className={styles.error}>{errorMessage}</p>
      </Popup>

      {!bookDetails && (
        <p className={styles.error}>
          {bookDetailsPageMessages.notFoundIdTitle}
        </p>
      )}

      {isBookLoading && <Spinner isLoading={isBookLoading} />}

      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      <Button onClick={handleCloseButton}>
        {bookDetailsPageMessages.closeButton}
      </Button>
    </section>
  );
};
