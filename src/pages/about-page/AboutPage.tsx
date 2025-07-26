import { RSSCHOOL_URL } from '@/sources/constants';
import styles from './AboutPage.module.scss';
import { AboutMeDataList } from './components/about-me-list/aboutMeList';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '@/router/enums';

export const AboutPage = () => {
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    void navigate(PagePath.root);
  };

  return (
    <section data-testid="about-page" className={styles.container}>
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

      <a
        href={RSSCHOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {messages.linkTitle}
      </a>

      <Button onClick={navigateToMainPage}>{messages.backButton}</Button>
    </section>
  );
};
