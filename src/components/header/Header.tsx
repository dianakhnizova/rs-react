import styles from './Header.module.scss';
import { Logo } from './components/logo/Logo';
import { NavLinks } from './components/nav-links/NavLinks';

export const Header = () => {
  return (
    <header className={styles.container}>
      <Logo />

      <NavLinks />
    </header>
  );
};
