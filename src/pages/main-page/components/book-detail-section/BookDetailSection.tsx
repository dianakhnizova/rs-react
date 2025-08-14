'use client';

import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import { Button } from '@/components/button/Button';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useParams } from 'next/navigation';
import { Spinner } from '@/components/spinner/Spinner';
import { Popup } from '@/components/popup/Popup';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectCurrentPage } from '@/store/slices/pagination/selectors';
import { useEffect, useState } from 'react';
import { IBookData } from '@/sources/interfaces';
import { bookService } from '@/api/services/booksService';

export const BookDetailSection = () => {
  const { navigateToBookList } = useNavigationToPath();
  const [bookDetails, setBookDetails] = useState<IBookData | null>(null);

  const [isBookLoading, setIsBookLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const params = useParams();
  const detailsId = params?.detailsId as string | undefined;

  const currentPage = useAppSelector(selectCurrentPage);

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

        setErrorMessage(message);
      } finally {
        setIsBookLoading(false);
      }
    };

    void loadBookDetails();
  }, [detailsId]);

  const handleCloseButton = () => {
    navigateToBookList(currentPage);
  };

  return (
    <section className={styles.container}>
      <Spinner isLoading={isBookLoading} />

      <Popup
        isOpen={!!errorMessage || !bookDetails}
        isError
        error={getErrorMessage(errorMessage)}
      >
        <p className={styles.error}>
          {bookDetailsPageMessages.notFoundIdTitle}
        </p>
      </Popup>

      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      {!isBookLoading && (
        <Button onClick={handleCloseButton}>
          {bookDetailsPageMessages.closeButton}
        </Button>
      )}
    </section>
  );
};
