import styles from './Spinner.module.scss';
import { messages } from './messages';
import Image from 'next/image';

interface Props {
  isLoading: boolean;
}

const BookImage = '/book.png';

export const Spinner = ({ isLoading }: Props) => {
  if (!isLoading) return;

  return (
    <>
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src={BookImage}
            alt={messages.titleSpinner}
            width={100}
            height={230}
            style={{ width: '100%', height: 'auto' }}
            className={styles.image}
          />
        </div>

        <h2 className={styles.loadingTitle}>{messages.titleLoading}</h2>
      </div>
    </>
  );
};
