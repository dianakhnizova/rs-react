'use client';

import { ToggleTheme } from '@/components/toggle-theme/ToggleTheme';
import styles from './OptionsMenu.module.scss';
import { Favorites } from '@/components/favorites/Favorites';
import Link from 'next/link';
import { ToggleLanguage } from '@/components/toggle-language/ToggleLanguage';
import { useTranslations } from 'next-intl';
import { PagePath } from '@/sources/enums';

export const OptionsMenu = () => {
  const t = useTranslations('Header');

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <ToggleLanguage />

        <ToggleTheme />

        <Favorites />
      </div>

      <Link href={PagePath.root} className={styles.title}>
        {t('title')}
      </Link>
    </div>
  );
};
