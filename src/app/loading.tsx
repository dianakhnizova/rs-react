import { Spinner } from '@/components/spinner/Spinner';
import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Spinner isLoading />
    </div>
  );
}
