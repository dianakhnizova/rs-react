import { useEffect, useState } from 'react';
import { Table } from '../table/ Table';
import styles from './CountryList.module.scss';
import type { CountryData } from '@/sources/interfaces';
import { fetchCo2Data } from '@/api/fetchCo2Data';
import { MISSING_VALUE } from '@/sources/constants';
import { messages } from '@/sources/messages';

export const CountryList = () => {
  const [countryData, setCountryData] = useState<CountryData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCo2Data = async () => {
      setIsLoading(true);

      try {
        const co2Data = await fetchCo2Data();
        setCountryData(co2Data);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'error';

        console.log(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCo2Data();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Table
        columns={[
          messages.tableHeaderCountryList.labelName,
          messages.tableHeaderCountryList.labelPopulation,
          messages.tableHeaderCountryList.labelISO,
        ]}
      />

      <div className={styles.divider}></div>

      <div className={styles.list}>
        {countryData?.map(country => {
          const latestPopulation =
            country.data.at(-1)?.population ?? MISSING_VALUE;

          return (
            <Table
              key={country.name}
              columns={[country.name, latestPopulation, country.iso_code]}
              isList
            />
          );
        })}
      </div>
    </div>
  );
};
