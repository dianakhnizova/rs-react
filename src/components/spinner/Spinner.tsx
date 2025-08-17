'use client';

import { useTranslations } from 'next-intl';
import styles from './Spinner.module.scss';
import Image from 'next/image';

interface Props {
  isLoading: boolean;
}

const BookImage = '/book.png';

export const Spinner = ({ isLoading }: Props) => {
  const t = useTranslations('Spinner');

  if (!isLoading) return;

  return (
    <>
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src={BookImage}
            alt={t('titleSpinner')}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        <h2 className={styles.loadingTitle}>{t('titleLoading')}</h2>
      </div>
    </>
  );
};
