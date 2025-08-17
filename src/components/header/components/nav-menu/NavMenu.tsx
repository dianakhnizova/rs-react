'use client';

import styles from './NavMenu.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PagePath } from '@/sources/enums';

export const NavMenu = () => {
  const t = useTranslations('Header');

  return (
    <nav className={styles.container}>
      <Link href={PagePath.aboutPage} className={styles.link}>
        {t('about')}
      </Link>
    </nav>
  );
};
