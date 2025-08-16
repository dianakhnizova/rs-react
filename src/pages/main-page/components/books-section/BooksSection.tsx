import styles from './BooksSection.module.scss';
import { BookListHeader } from './components/book-list-header/BookListHeader';
import { FC } from 'react';
import { IBookData } from '@/sources/interfaces';
import { BooksList } from './components/books-list/BooksList';

interface Props {
  initialBooks: IBookData[];
  initialTotalItems: number;
  initialErrorMessage: string;
}

export const BooksSection: FC<Props> = ({
  initialBooks,
  initialTotalItems,
  initialErrorMessage,
}) => {
  return (
    <section className={styles.container}>
      <BookListHeader />
      <BooksList
        initialBooks={initialBooks}
        initialTotalItems={initialTotalItems}
        initialErrorMessage={initialErrorMessage}
      />
    </section>
  );
};
