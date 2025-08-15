import styles from './BooksSection.module.scss';
import { BookListHeader } from './components/book-list-header/BookListHeader';
import { FC } from 'react';
import { ServerBookList } from './components/books-list/ServerBookList';

export const BooksSection: FC = () => {
  return (
    <section className={styles.container}>
      <BookListHeader />
      <ServerBookList searchTerm="" currentPage={1} />
    </section>
  );
};
