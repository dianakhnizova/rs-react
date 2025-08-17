'use client';

import { ToggleTheme } from '@/components/toggle-theme/ToggleTheme';
import styles from './OptionsMenu.module.scss';
import { Favorites } from '@/components/favorites/Favorites';
import { ToggleLanguage } from '@/components/toggle-language/ToggleLanguage';
import { useTranslations } from 'next-intl';
import { PagePath } from '@/sources/enums';
import { createNavigation } from 'next-intl/navigation';

export const OptionsMenu = () => {
  const t = useTranslations('Header');
  const { Link } = createNavigation();

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
