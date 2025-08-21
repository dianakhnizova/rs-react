import styles from './ControlledForm.module.scss';
import { Button } from '../button/Button';
import { messages } from '@/sources/messages';

export const ControlledForm = () => {
  return (
    <div className={styles.container}>
      <form action="">
        <input type="text" />
        <input type="number" />
        <input type="e-mail" />
        <input type="password" />
        <input type="password" />

        <Button>{messages.button.submitButton}</Button>
      </form>
    </div>
  );
};
