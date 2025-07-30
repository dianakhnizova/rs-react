import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../../../../../../components/books-cards/BookCard';
import type { IBookData } from '@/sources/interfaces';
import { Pagination } from '@/components/pagination/Pagination';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '@/utils/hooks/useTypedSelector';

export interface Props {
  books: IBookData[];
  totalItems: number;
  currentPage: number;
  onBookClick: (bookId: string) => void;
}

export const BooksList = ({
  books,
  totalItems,
  currentPage,
  onBookClick,
}: Props) => {
  const { isSelected } = useTypedSelector(state => state.selection);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const { detailsId } = useParams();
  const navigate = useNavigate();

  const handlePagination = (page: number) => {
    const newUrl = detailsId ? `/${page}/${detailsId}` : `/${page}`;
    void navigate(newUrl);
  };

  return (
    <>
      {books.length === 0 ? (
        <p className={styles.title}>{messages.emptyList}</p>
      ) : (
        <ul className={styles.booksContainer}>
          {books.map((book: IBookData) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => onBookClick(book.id)}
              isSelected={isSelected}
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
