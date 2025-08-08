import styles from './BooksSection.module.scss';
import { BookListHeader } from './components/book-list-header/BookListHeader';
import { FC } from 'react';
import { BooksList } from './components/books-list/BooksList';

export const BooksSection: FC = () => {
  return (
    <div className={styles.container}>
      <BookListHeader />

      <BooksList />
    </div>
  );
};
