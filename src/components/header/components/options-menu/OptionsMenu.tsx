'use client';

import { ToggleTheme } from '@/components/toggle-theme/ToggleTheme';
import styles from './OptionsMenu.module.scss';
import { messages } from './messages';
import { PagePath } from '@/sources/page-path/enums';
import { Favorites } from '@/components/favorites/Favorites';
import Link from 'next/link';
import { ToggleLanguage } from '@/components/toggle-language/ToggleLanguage';

export const OptionsMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <ToggleLanguage />

        <ToggleTheme />

        <Favorites />
      </div>

      <Link href={PagePath.root} className={styles.title}>
        {messages.appTitle}
      </Link>
    </div>
  );
};
