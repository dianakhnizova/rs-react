import styles from './Header.module.scss';
import { messages } from './messages';

export const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>{messages.appTitle}</h1>
    </header>
  );
};
