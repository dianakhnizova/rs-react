'use client';

import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { Button } from '@/components/button/Button';
import { IBookData } from '@/sources/interfaces';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import Link from 'next/link';

interface Props {
  bookDetails: IBookData | null;
}

export const BookDetailSection = ({ bookDetails }: Props) => {
  const { navigateToBookList } = useNavigationToPath();
  return (
    <section className={styles.container}>
      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      <Link href={navigateToBookList()}>
        <Button>{bookDetailsPageMessages.closeButton}</Button>
      </Link>
    </section>
  );
};
