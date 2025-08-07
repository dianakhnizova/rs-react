import styles from './BooksSection.module.scss';
import { BookListHeader } from './components/book-list-header/BookListHeader';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const BooksSection: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <BookListHeader />

      {children}
    </div>
  );
};
