'use client';

import { useTranslations } from 'next-intl';
import styles from './Spinner.module.scss';
import Image from 'next/image';

interface Props {
  isLoading: boolean;
}

const BookImage = '/book.png';

export const Spinner = ({ isLoading }: Props) => {
  const t = useTranslations('Refresh');

  if (!isLoading) return;

  return (
    <>
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src={BookImage}
            alt={t('titleSpinner')}
            width={100}
            height={230}
            className={styles.image}
            priority
          />
        </div>

        <h2 className={styles.loadingTitle}>{t('titleLoading')}</h2>
      </div>
    </>
  );
};
