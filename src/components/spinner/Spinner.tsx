import { messages } from '@/sources/messages';
import styles from './Spinner.module.scss';

interface Props {
  isLoading: boolean;
}

export const Spinner = ({ isLoading }: Props) => {
  if (!isLoading) return;

  return (
    <div className={styles.container}>
      <img
        src={'/loading.gif'}
        alt={messages.spinner.titleSpinner}
        className={styles.image}
      />

      <h2 className={styles.loadingTitle}>{messages.spinner.titleLoading}</h2>
    </div>
  );
};
