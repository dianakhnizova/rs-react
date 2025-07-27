import { RS_SCHOOL_URL } from '@/sources/constants';
import styles from './AboutPage.module.scss';
import { aboutMeDataList } from './utils/aboutMeList';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';

export const AboutPage = () => {
  const navigate = useNavigate();

  const navigateToBack = () => {
    void navigate(-1);
  };

  return (
    <section data-testid="about-page" className={styles.container}>
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
