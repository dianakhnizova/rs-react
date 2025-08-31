import { Spinner } from '@/components/spinner/Spinner';
import styles from './HomePage.module.scss';
import { Suspense } from 'react';
import { CountryListWrapper } from '@/components/country-list/CountryListWrapper';
import { messages } from '@/sources/messages';
import { Filter } from '@/components/filter/Filter';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{messages.homePage.appTitle}</h1>

      <Filter />

      <Suspense fallback={<Spinner isLoading={true} />}>
        <CountryListWrapper />
      </Suspense>
    </div>
  );
};
