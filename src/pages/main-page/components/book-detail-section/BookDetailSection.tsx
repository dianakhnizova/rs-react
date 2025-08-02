import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { Button } from '@/components/button/Button';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/spinner/Spinner';
import { useGetBookByIdQuery } from '@/api/book.api';
import { skipToken } from '@reduxjs/toolkit/query';

export const BookDetailSection = () => {
  const { currentPage, navigateToList } = useNavigationToPath();
  const { detailsId } = useParams();

  const {
    data: bookDetails,
    isFetching,
    isError,
  } = useGetBookByIdQuery(detailsId ?? skipToken);

  const handleCloseButton = () => {
    navigateToList(currentPage);
  };

  return (
    <section className={styles.container}>
      <Spinner isLoading={isFetching} data-testid="spinner" />

      {(isError || !bookDetails) && !isFetching && (
        <p className={styles.error}>
          {bookDetailsPageMessages.notFoundIdTitle}
        </p>
      )}

      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      {!isFetching && (
        <Button onClick={handleCloseButton}>
          {bookDetailsPageMessages.closeButton}
        </Button>
      )}
    </section>
  );
};
