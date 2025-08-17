'use client';

import { Popup } from '@/components/popup/Popup';
import styles from './BookDetailSection.module.scss';
import { BooksDetails } from './components/BooksDetails';
import { Button } from '@/components/button/Button';
import { IBookData } from '@/sources/interfaces';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useTranslations } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  initialBookDetails: IBookData | null;
  initialError: string | null;
}

export const BookDetailSection: FC<Props> = ({
  initialBookDetails,
  initialError,
}) => {
  const t = useTranslations('BookDetails');
  const s = useTranslations('Sources');

  const [errorMessage, setErrorMessage] = useState(initialError);

  const { Link } = createNavigation();

  const { navigateToBookList } = useNavigationToPath();

  useEffect(() => {
    if (initialError) {
      setErrorMessage(initialError);
    }
  }, [initialError]);

  return (
    <section className={styles.container}>
      {initialError && (
        <Popup
          isOpen={!!errorMessage}
          isError
          error={errorMessage ?? s('errorDetailsMessage')}
        />
      )}

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
