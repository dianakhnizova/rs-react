import { ToggleTheme } from '@/components/toggle-theme/ToggleTheme';
import styles from './OptionsMenu.module.scss';
import { messages } from './messages';
import { PagePath } from '@/router/enums';
import { NavLink } from 'react-router-dom';
import { Favorites } from '@/components/favorites/Favorites';

export const OptionsMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <ToggleTheme />

        <Favorites />
      </div>

      <NavLink to={PagePath.root} className={styles.title}>
        {messages.appTitle}
      </NavLink>
    </div>
  );
};
