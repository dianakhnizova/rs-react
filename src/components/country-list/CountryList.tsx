import { FC, useState } from 'react';
import { Table } from '../table/Table';
import styles from './CountryList.module.scss';
import type { CountryData } from '@/sources/interfaces';
import { MISSING_VALUE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import { CountryInfo } from '../country-info/CountryInfo';

interface Props {
  countries: CountryData[];
}

export const CountryList: FC<Props> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleClick = (countryName: string) => {
    setSelectedCountry(prev => (prev === countryName ? null : countryName));
  };

  return (
    <div className={styles.container}>
      <Table
        columns={[
          messages.tableHeaderCountryList.labelName,
          messages.tableHeaderCountryList.labelPopulation,
          messages.tableHeaderCountryList.labelISO,
        ]}
      />

      <div className={styles.divider} />

      <div className={styles.listContainer}>
        {countries.map(country => {
          const latestPopulation =
            country.data.at(-1)?.population ?? MISSING_VALUE;

          return (
            <div key={`${country.name}-list`} className={styles.list}>
              <Table
                key={country.name}
                columns={[country.name, latestPopulation, country.iso_code]}
                handleClick={() => handleClick(country.name)}
                isList
                isActive={selectedCountry === country.name}
              />

              {selectedCountry === country.name && (
                <CountryInfo info={[country]} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
