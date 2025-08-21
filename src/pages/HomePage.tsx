import { Button } from '@/components/button/Button';
import styles from './HomePage.module.scss';
import { messages } from './messages';
import { UncontrolledForm } from '@/components/uncontrolled-form/UncontrolledForm';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{messages.appTitle}</h1>

      <div className={styles.buttonContainer}>
        <Button>{messages.uncontrolledButton}</Button>
        <Button>{messages.reactHookFormButton}</Button>
      </div>

      <UncontrolledForm />
    </div>
  );
};
