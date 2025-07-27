import { messages } from './messages';
import styles from './BookListHeader.module.scss';

export const BookListHeader = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{messages.titleName}</p>
      <p className={styles.title}>{messages.titleImage}</p>
    </div>
  );
};
