import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../../../../../../components/book-card/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { Spinner } from '@/components/spinner/Spinner';
import { FC } from 'react';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectCurrentPage } from '@/store/slices/pagination/selectors';
import { useGetBooksListQuery } from '@/api/book.api';
import { selectSearchTerm } from '@/store/slices/search/selectors';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { Popup } from '@/components/popup/Popup';
import { BookListPagination } from './book-list-pagination/BookListPagination';

export const BooksList: FC = () => {
  const { navigateToBookDetail } = useNavigationToPath();

  const searchTerm = useAppSelector(selectSearchTerm);
  const currentPage = useAppSelector(selectCurrentPage);

  const { data, isFetching, isError, error } = useGetBooksListQuery({
    query: searchTerm,
    page: currentPage,
  });

  const books = data?.books || [];

  return (
    <>
      <Spinner isLoading={isFetching} data-testid="spinner" />

      <Popup
        isOpen={!!isError}
        isError
        error={getErrorMessage(error)}
        data-testid="popup"
      />

      {books.length === 0 ? (
        <p className={styles.title}>{messages.emptyList}</p>
      ) : (
        <ul className={styles.booksContainer}>
          {books.map((book: IBookData) => (
            <BookCard
              key={book.id}
              book={book}
              to={navigateToBookDetail(book.id)}
              isSelected
            />
          ))}
        </ul>
      )}

      {books.length > 0 && <BookListPagination />}
    </>
  );
};
