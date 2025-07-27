import { NavLinks } from './components/NavLinks';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { messages } from './messages';
import { PagePath } from '@/router/enums';

export const Header = () => {
  return (
    <header className={styles.container}>
      <NavLink to={PagePath.root} className={styles.title}>
        {messages.appTitle}
      </NavLink>
      <NavLinks />
    </header>
  );
};
