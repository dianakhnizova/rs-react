'use client';

import { RS_SCHOOL_URL } from '@/sources/constants';
import styles from './AboutPage.module.scss';
import { aboutMeDataList } from './utils/aboutMeList';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { useRouter } from 'next/navigation';

export const AboutPage = () => {
  const router = useRouter();

  const navigateToBack = () => {
    router.back();
  };

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

      <a
        href={RS_SCHOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {messages.linkTitle}
      </a>

      <Button onClick={navigateToBack}>{messages.backButton}</Button>
    </section>
  );
};
