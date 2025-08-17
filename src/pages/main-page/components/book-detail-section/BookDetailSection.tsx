'use client';

import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { Button } from '@/components/button/Button';
import { IBookData } from '@/sources/interfaces';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';
interface Props {
  initialBookDetails: IBookData | null;
}

export const BookDetailSection: FC<Props> = ({ initialBookDetails }) => {
  const t = useTranslations('BookDetails');

  const { navigateToBookList } = useNavigationToPath();

  return (
    <section className={styles.container}>
      {initialBookDetails ? (
        <BooksDetails bookDetail={initialBookDetails} />
      ) : (
        <p className={styles.error}>{t('notFoundIdTitle')}</p>
      )}

      <Link href={navigateToBookList()}>
        <Button>{t('close')}</Button>
      </Link>
    </section>
  );
};
