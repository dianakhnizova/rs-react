'use client';

import styles from './BookListHeader.module.scss';
import { useTranslations } from 'next-intl';

export const BookListHeader = () => {
  const t = useTranslations('BookListHeader');

  return (
    <div className={styles.container}>
      <p className={styles.title}>{t('title')}</p>
      <p className={styles.title}>{t('image')}</p>
    </div>
  );
};
