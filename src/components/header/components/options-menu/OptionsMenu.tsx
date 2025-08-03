import { ToggleTheme } from '@/components/toggle-theme/ToggleTheme';
import styles from './OptionsMenu.module.scss';
import { messages } from './messages';
import { PagePath } from '@/router/enums';
import { NavLink } from 'react-router-dom';

export const OptionsMenu = () => {
  return (
    <div className={styles.container}>
      <ToggleTheme />

      <NavLink to={PagePath.root} className={styles.title}>
        {messages.appTitle}
      </NavLink>
    </div>
  );
};
