import { Button } from '@/components/button/Button';
import styles from './HomePage.module.scss';
import { messages } from '@/sources/messages';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <Button>{messages.button.search}</Button>
    </div>
  );
};
