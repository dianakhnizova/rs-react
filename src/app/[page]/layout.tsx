import styles from './PageLayout.module.scss';
import { MainPage } from '@/pages/main-page/MainPage';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <MainPage />

      {children}
    </div>
  );
};

export default PageLayout;
