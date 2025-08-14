import { ToggleTheme } from '@/components/toggle-theme/ToggleTheme';
import styles from './OptionsMenu.module.scss';
import { messages } from './messages';
import { PagePath } from '@/router/enums';
import { Favorites } from '@/components/favorites/Favorites';
import Link from 'next/link';

export const OptionsMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <ToggleTheme />

        <Favorites />
      </div>

      <Link href={PagePath.root} className={styles.title}>
        {messages.appTitle}
      </Link>
    </div>
  );
};
