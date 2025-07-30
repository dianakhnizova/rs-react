import styles from './Logo.module.scss';
import { messages } from './messages';
import { PagePath } from '@/router/enums';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <NavLink to={PagePath.root} className={styles.title}>
      {messages.appTitle}
    </NavLink>
  );
};
