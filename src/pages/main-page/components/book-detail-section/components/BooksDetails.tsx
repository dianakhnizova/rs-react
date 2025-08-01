import { BookCard } from '@/components/books-cards/BookCard';
import { IBookData } from '@/sources/interfaces';
import { messages } from './messages';
import styles from './BooksDetails.module.scss';
import { FC } from 'react';
import { isDetailsCard } from '@/utils/bookCardUtils';

export interface Props {
  bookDetail: IBookData;
}

export const BooksDetails: FC<Props> = ({ bookDetail }: Props) => {
  const showDetailsStyles = isDetailsCard(true);

  return (
    <div className={styles.container}>
      <BookCard
        key={bookDetail.id}
        book={bookDetail}
        isDetailes={showDetailsStyles}
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
    </div>
  );
};
