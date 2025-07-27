import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../../../../../../components/books-cards/BookCard';
import type { BookData } from '@/sources/types';
import { Pagination } from '@/components/pagination/Pagination';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useNavigate, useParams } from 'react-router-dom';

export interface Props {
  books: BookData[];
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
          {books.map((book: BookData) => (
            <BookCard
              key={book.id}
              title={book.title}
              image={book.image}
              onClick={() => onBookClick(book.id)}
            />
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePagination}
        totalPages={totalPages}
      />
    </>
  );
};
