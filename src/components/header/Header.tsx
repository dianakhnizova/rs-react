import styles from './Header.module.scss';
import { NavMenu } from './components/nav-menu/NavMenu';
import { OptionsMenu } from './components/options-menu/OptionsMenu';

export const Header = () => {
  return (
    <header className={styles.container}>
      <OptionsMenu />

      <NavMenu />
    </header>
  );
};
