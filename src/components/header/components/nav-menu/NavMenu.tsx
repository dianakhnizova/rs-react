'use client';

import styles from './NavMenu.module.scss';
import { useTranslations } from 'next-intl';
import { PagePath } from '@/sources/enums';
import { createNavigation } from 'next-intl/navigation';

export const NavMenu = () => {
  const t = useTranslations('Header');
  const { Link } = createNavigation();

  return (
    <nav className={styles.container}>
      <Link href={PagePath.aboutPage} className={styles.link}>
        {t('about')}
      </Link>
    </nav>
  );
};
