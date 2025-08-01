import styles from './Header.module.scss';
import { NavLeftMenu } from './components/nav-left-menu/NavLeftMenu';
import { NavRightMenu } from './components/nav-right-menu/NavRightMenu';

export const Header = () => {
  return (
    <header className={styles.container}>
      <NavLeftMenu />

      <NavRightMenu />
    </header>
  );
};
