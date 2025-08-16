'use client';

import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages, messages } from './messages';
import { Button } from '@/components/button/Button';
import { IBookData } from '@/sources/interfaces';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import Link from 'next/link';
import { FC } from 'react';
interface Props {
  initialBookDetails: IBookData | null;
}

export const BookDetailSection: FC<Props> = ({ initialBookDetails }) => {
  const { navigateToBookList } = useNavigationToPath();

  return (
    <section className={styles.container}>
      {initialBookDetails ? (
        <BooksDetails bookDetail={initialBookDetails} />
      ) : (
        <p className={styles.error}>{messages.notFoundIdTitle}</p>
      )}

      <Link href={navigateToBookList()}>
        <Button>{bookDetailsPageMessages.closeButton}</Button>
      </Link>
    </section>
  );
};
