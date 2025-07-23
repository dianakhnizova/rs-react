import { RSSCHOOL_URL } from '@/sources/constants';
import styles from './AboutPage.module.scss';
import { AboutMeDataList } from './components/about-me-list/aboutMeList';
import { messages } from './messages';

export const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {AboutMeDataList.map((data, index) => {
          return (
            <div key={index} className={styles.dataContainer}>
              <p className={styles.label}>{data.label}</p>
              <p className={styles.data}>{data.data}</p>
            </div>
          );
        })}
      </div>

      <a href={RSSCHOOL_URL}>{messages.linkTitle}</a>
    </div>
  );
};
