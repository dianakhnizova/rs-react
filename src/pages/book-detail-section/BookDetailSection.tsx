import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { Button } from '@/components/button/Button';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/spinner/Spinner';
import { useGetBookByIdQuery } from '@/api/book.api';
export const BookDetailSection = () => {
  const { detailsId } = useParams();

  const { currentPage, navigateToList } = useNavigationToPath();
  const {
    data: bookDetails,
    isLoading,
    isError,
  } = useGetBookByIdQuery(detailsId!, {
    skip: !detailsId,
  });

  const handleCloseButton = () => {
    navigateToList(currentPage);
  };

  return (
    <section className={styles.container}>
      <Spinner isLoading={isLoading} data-testid="spinner" />

      {(isError || !bookDetails) && !isLoading && (
        <p className={styles.error}>
          {bookDetailsPageMessages.notFoundIdTitle}
        </p>
      )}

      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      {!isLoading && (
        <Button onClick={handleCloseButton}>
          {bookDetailsPageMessages.closeButton}
        </Button>
      )}
    </section>
  );
};
