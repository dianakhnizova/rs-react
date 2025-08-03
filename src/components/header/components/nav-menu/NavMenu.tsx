import { PagePath } from '@/router/enums';
import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.scss';
import { messages } from './messages';

export const NavMenu = () => {
  return (
    <nav className={styles.container}>
      <NavLink to={PagePath.aboutPage} className={styles.link}>
        {messages.titleAboutLink}
      </NavLink>
    </nav>
  );
};
