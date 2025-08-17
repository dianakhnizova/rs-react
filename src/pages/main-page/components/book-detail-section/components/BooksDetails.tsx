'use client';

import { BookCard } from '@/components/book-card/BookCard';
import { IBookData } from '@/sources/interfaces';
import styles from './BooksDetails.module.scss';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

export interface Props {
  bookDetail: IBookData;
}

export const BooksDetails: FC<Props> = ({ bookDetail }: Props) => {
  const t = useTranslations('BookDetails');

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
              t('titleNotDescription'),
            className: styles.description,
          },
          {
            value: bookDetail.bookDetails.authors || t('titleNotAuthor'),
            className: styles.authors,
          },
          {
            value:
              bookDetail.bookDetails.first_publish_date ||
              t('titleNotPublishedDate'),
            className: styles.year,
          },
        ]}
      />
    </div>
  );
};
