import styles from './BookDetailSection.module.scss';
import { useOutletContext } from 'react-router-dom';
import { BooksDetails } from './components/BooksDetails';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { BookData } from '@/sources/types';
import { useNavigation } from '@/utils/hooks/useNavigation';

export const BookDetailSection = () => {
  const context = useOutletContext<
    { bookDetails: BookData | null } | undefined
  >();
  const { bookDetails } = context || { bookDetails: null };
  const { currentPage, navigateToList } = useNavigation();

  if (!bookDetails) {
    return <p className={styles.error}>{messages.notFoundIdTitle}</p>;
  }

  const handleCloseButton = () => {
    navigateToList(currentPage);
  };

  return (
    <section className={styles.container}>
      <BooksDetails bookDetail={bookDetails} />

      <Button onClick={handleCloseButton}>{messages.closeButton}</Button>
    </section>
  );
};
