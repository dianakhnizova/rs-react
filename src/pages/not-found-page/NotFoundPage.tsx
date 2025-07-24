import { Button } from '@/components/button/Button';
import { messages } from './messages';
import styles from './NotFoundPage.module.scss';
import NotFoundIcon from '@/assets/404.png';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '@/router/enums';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    void navigate(PagePath.root);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={NotFoundIcon}
          alt={messages.imgTitle}
          className={styles.image}
        />
      </div>

      <Button onClick={navigateToMain}>{messages.navigateMainButton}</Button>
    </div>
  );
};
