import styles from './BooksSection.module.scss';
import { BookListHeader } from '../../../../components/book-list-header/BookListHeader';

interface Props {
  children: React.ReactNode;
}

export const BooksSection = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <BookListHeader />

      <div className={styles.gridDivider} />

      {children}
    </div>
  );
};
