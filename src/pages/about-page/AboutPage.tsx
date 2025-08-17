'use client';

import { RS_SCHOOL_URL } from '@/sources/constants';
import styles from './AboutPage.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getAboutMeDataList } from './utils/aboutMeList';
import { PagePath } from '@/sources/enums';

export const AboutPage = () => {
  const t = useTranslations('AboutPage');
  const s = useTranslations('Sources');

  const aboutMeDataList = getAboutMeDataList(t);

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
        {t('linkTitle')}
      </Link>

      <Link href={PagePath.root} className={styles.link}>
        {s('navigateMain')}
      </Link>
    </section>
  );
};
