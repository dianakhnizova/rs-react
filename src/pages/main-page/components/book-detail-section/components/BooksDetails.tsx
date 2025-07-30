import { BookCard } from '@/components/books-cards/BookCard';
import { IBookData } from '@/sources/interfaces';
import { messages } from './messages';
import styles from './BooksDetails.module.scss';

export interface Props {
  bookDetail: IBookData;
}

export const BooksDetails = ({ bookDetail }: Props) => {
  return (
    <div className={styles.container}>
      {bookDetail && (
        <BookCard
          key={bookDetail.id}
          book={bookDetail}
          details={[
            {
              value:
                bookDetail.bookDetails.description.trim() ||
                messages.titleNotDescription,
              className: styles.description,
            },
            {
              value: bookDetail.bookDetails.authors || messages.titleNotAuthor,
              className: styles.authors,
            },
            {
              value: bookDetail.bookDetails.year || messages.titleNotPageCount,
              className: styles.year,
            },
          ]}
        />
      )}
    </div>
  );
};
