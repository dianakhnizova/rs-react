'use client';

import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { messages as bookDetailsPageMessages } from './messages';
import { Button } from '@/components/button/Button';
import { IBookData } from '@/sources/interfaces';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Props {
  bookDetails: IBookData | null;
}

export const BookDetailSection = ({ bookDetails }: Props) => {
  const params = useParams<{ page: string; id: string }>();
  const currentPage = params?.page ?? '1';

  return (
    <section className={styles.container}>
      {bookDetails && <BooksDetails bookDetail={bookDetails} />}

      <Link href={`/${currentPage}`}>
        <Button>{bookDetailsPageMessages.closeButton}</Button>
      </Link>
    </section>
  );
};
