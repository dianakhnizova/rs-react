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
              value: bookDetail.description || messages.titleNotDescription,
              className: 'description',
            },
            {
              value: bookDetail.authors || messages.titleNotAuthor,
              className: 'authors',
            },
            {
              value: bookDetail.year || messages.titleNotPageCount,
              className: 'year',
            },
            {
              value: bookDetail.printType || messages.titleNotPrintType,
              className: 'printType',
            },
          ]}
        />
      )}
    </div>
  );
};
