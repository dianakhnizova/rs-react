import { RS_SCHOOL_URL } from '@/sources/constants';
import styles from './AboutPage.module.scss';
import { aboutMeDataList } from './utils/aboutMeList';
import { messages as aboutMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import Link from 'next/link';
import { PagePath } from '@/router/enums';

export const AboutPage = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.infoContainer}>
        {aboutMeDataList.map((data, index) => {
          return (
            <li key={index} className={styles.dataContainer}>
              <p className={styles.label}>{data.label}</p>
              <p className={styles.data}>{data.data}</p>
            </li>
          );
        })}
      </ul>

      <Link
        href={RS_SCHOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {aboutMessages.linkTitle}
      </Link>

      <Link href={PagePath.root} className={styles.link}>
        {sourceMessages.navigateMainButton}
      </Link>
    </section>
  );
};
