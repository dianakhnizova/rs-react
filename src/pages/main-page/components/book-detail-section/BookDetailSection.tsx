'use client';

import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { Button } from '@/components/button/Button';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectCurrentPage } from '@/store/slices/pagination/selectors';
import { IBookData } from '@/sources/interfaces';
import Link from 'next/link';

interface Props {
  bookDetails: IBookData | null;
}

export const BookDetailSection = ({ bookDetails }: Props) => {
  const currentPage = useAppSelector(selectCurrentPage);

  return (
    <section className={styles.container}>
      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      <Link href={`/${currentPage}`} scroll={false}>
        <Button>{bookDetailsPageMessages.closeButton}</Button>
      </Link>
    </section>
  );
};
