import { PagePath } from '@/sources/page-path/enums';
import { messages as notFoundMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import styles from './NotFoundPage.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundIcon = '/404.png';

export const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={NotFoundIcon}
          alt={notFoundMessages.imgTitle}
          width={200}
          height={300}
        />
      </div>

      <Link href={PagePath.root} className={styles.link}>
        {sourceMessages.navigateMainButton}
      </Link>
    </section>
  );
};
