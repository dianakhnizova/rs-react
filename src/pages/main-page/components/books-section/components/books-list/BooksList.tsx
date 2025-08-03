import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../../../../../../components/book-card/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { Pagination } from '@/components/pagination/Pagination';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@/components/spinner/Spinner';
import { FC } from 'react';

export interface Props {
  books: IBookData[];
  totalItems: number;
  currentPage: number;
  onBookClick: (bookId: string) => void;
  isFetching: boolean;
}

export const BooksList: FC<Props> = ({
  books,
  totalItems,
  currentPage,
  onBookClick,
  isFetching,
}: Props) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const { detailsId } = useParams();
  const navigate = useNavigate();

  const handlePagination = (page: number) => {
    const newUrl = detailsId ? `/${page}/${detailsId}` : `/${page}`;
    void navigate(newUrl);
  };

  return (
    <>
      <Spinner isLoading={isFetching} data-testid="spinner" />

      {books.length === 0 ? (
        <p className={styles.title}>{messages.emptyList}</p>
      ) : (
        <ul className={styles.booksContainer}>
          {books.map((book: IBookData) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => onBookClick(book.id)}
              isSelected
            />
          ))}
        </ul>
      )}

      {books.length > 0 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePagination}
          totalPages={totalPages}
        />
      )}
    </>
  );
};
