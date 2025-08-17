'use client';

import styles from './NotFoundPage.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PagePath } from '@/sources/enums';
import { createNavigation } from 'next-intl/navigation';

const NotFoundIcon = '/404.png';

export const NotFoundPage = () => {
  const s = useTranslations('Sources');
  const a = useTranslations('Alt');

  const { Link } = createNavigation();

  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={NotFoundIcon}
          alt={a('imgNotFoundTitle')}
          width={200}
          height={300}
        />
      </div>

      <Link href={PagePath.root} className={styles.link}>
        {s('navigateMain')}
      </Link>
    </section>
  );
};
