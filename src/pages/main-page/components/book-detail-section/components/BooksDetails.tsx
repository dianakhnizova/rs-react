import { BookCard } from '@/components/book-card/BookCard';
import { IBookData } from '@/sources/interfaces';
import { messages } from './messages';
import styles from './BooksDetails.module.scss';
import { FC } from 'react';

export interface Props {
  bookDetail: IBookData;
}

export const BooksDetails: FC<Props> = ({ bookDetail }: Props) => {
  return (
    <div className={styles.container}>
      <BookCard
        key={bookDetail.id}
        book={bookDetail}
        isDetails
        details={[
          {
            value:
              bookDetail.bookDetails.description?.trim() ||
              messages.titleNotDescription,
            className: styles.description,
          },
          {
            value: bookDetail.bookDetails.authors || messages.titleNotAuthor,
            className: styles.authors,
          },
          {
            value:
              bookDetail.bookDetails.first_publish_date ||
              messages.titleNotPublishedDate,
            className: styles.year,
          },
        ]}
      />
    </div>
  );
};
