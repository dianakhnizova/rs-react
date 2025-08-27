import { Spinner } from '@/components/spinner/Spinner';
import styles from './HomePage.module.scss';
import { Suspense } from 'react';
import { CountryListWrapper } from '@/components/country-list/CountryListWrapper';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner isLoading={true} />}>
        <CountryListWrapper />
      </Suspense>
    </div>
  );
};
