import styles from './Footer.module.scss';
import { messages } from './messages';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <p>{messages.bottomTitle}</p>
    </footer>
  );
};
