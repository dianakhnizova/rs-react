import { FC } from 'react';
import { Table } from '../table/Table';
import styles from './CountryList.module.scss';
import type { CountryData } from '@/sources/interfaces';
import { MISSING_VALUE } from '@/sources/constants';
import { messages } from '@/sources/messages';

interface Props {
  countries: CountryData[];
}

export const CountryList: FC<Props> = ({ countries }) => {
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
        {countries.map(country => {
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
