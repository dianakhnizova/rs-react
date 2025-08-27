import styles from './HomePage.module.scss';
import { CountryList } from '@/components/country-list/CountryList';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <CountryList />
    </div>
  );
};
