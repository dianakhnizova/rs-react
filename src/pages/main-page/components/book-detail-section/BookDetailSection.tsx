import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { Button } from '@/components/button/Button';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/spinner/Spinner';
import { useGetBookByIdQuery } from '@/api/book.api';
import { skipToken } from '@reduxjs/toolkit/query';
import { Popup } from '@/components/popup/Popup';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const BookDetailSection = () => {
  const { currentPage, navigateToList } = useNavigationToPath();
  const { detailsId } = useParams();

  const {
    data: bookDetails,
    isFetching,
    isError,
    error,
  } = useGetBookByIdQuery(detailsId ?? skipToken);

  const handleCloseButton = () => {
    navigateToList(currentPage);
  };

  return (
    <section className={styles.container}>
      <Spinner isLoading={isFetching} data-testid="spinner" />

      <Popup
        isOpen={isError || (!bookDetails && !isFetching)}
        isError
        error={getErrorMessage(error)}
      >
        <p className={styles.error}>
          {bookDetailsPageMessages.notFoundIdTitle}
        </p>
      </Popup>

      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      {!isFetching && (
        <Button onClick={handleCloseButton}>
          {bookDetailsPageMessages.closeButton}
        </Button>
      )}
    </section>
  );
};
