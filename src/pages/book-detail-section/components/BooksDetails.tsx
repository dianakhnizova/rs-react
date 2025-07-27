import { BookCard } from '@/components/books-cards/BookCard';
import { BookData } from '@/sources/types';
import { messages } from './messages';
import styles from './BooksDetails.module.scss';

export interface Props {
  bookDetail: BookData;
}

export const BooksDetails = ({ bookDetail }: Props) => {
  return (
    <div className={styles.container}>
      {bookDetail && (
        <BookCard
          key={bookDetail.id}
          details={[
            {
              value: bookDetail.title.toUpperCase() || messages.titleNot,
              className: 'titleName',
            },
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
