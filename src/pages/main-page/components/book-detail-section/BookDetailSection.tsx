'use client';

import { bookService } from '@/api/services/booksService';
import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { Button } from '@/components/button/Button';
import { IBookData } from '@/sources/interfaces';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Popup } from '@/components/popup/Popup';
import { messages as sourceMessages } from '@/sources/messages';
import { Spinner } from '@/components/spinner/Spinner';

interface Props {
  detailsId: string;
  initialBookDetails: IBookData | null;
  initialErrorMessage: string;
}

export const BookDetailSection: FC<Props> = ({
  detailsId,
  initialBookDetails,
  initialErrorMessage,
}) => {
  const [bookDetails, setBookDetails] = useState<IBookData | null>(
    initialBookDetails
  );

  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const { navigateToBookList } = useNavigationToPath();

  useEffect(() => {
    const loadBookDetails = async () => {
      if (!detailsId) {
        setBookDetails(null);
        return;
      }
      setIsDetailsLoading(true);

      try {
        const bookDetails = await bookService.getBookById(detailsId);

        if (!bookDetails) {
          setBookDetails(null);
          setErrorMessage('');
        } else {
          setBookDetails(bookDetails);
          setErrorMessage('');
        }
      } catch (error: unknown) {
        setErrorMessage(
          error instanceof Error ? error.message : sourceMessages.errorMessage
        );
      } finally {
        setIsDetailsLoading(false);
      }
    };

    void loadBookDetails();
  }, [detailsId]);

  return (
    <section className={styles.container}>
      <Spinner isLoading={isDetailsLoading} />

      {!bookDetails && !isDetailsLoading && (
        <p className={styles.error}>
          {bookDetailsPageMessages.notFoundIdTitle}
        </p>
      )}

      <Popup isOpen={!!errorMessage} isError error={errorMessage} />

      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      <Link href={navigateToBookList()}>
        <Button>{bookDetailsPageMessages.closeButton}</Button>
      </Link>
    </section>
  );
};
