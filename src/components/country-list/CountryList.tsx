import { Table } from '../table/Table';
import styles from './CountryList.module.scss';
import { MISSING_VALUE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import { CountryInfo } from '../country-info/CountryInfo';
import { useSelector } from 'react-redux';
import { selectSelectedCountry } from '@/store/slices/country/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { selectSelectedYear } from '@/store/slices/year/selectors';
import { CountryData } from '@/sources/interfaces';
import { FC } from 'react';

interface Props {
  countries: CountryData[];
}

export const CountryList: FC<Props> = ({ countries }) => {
  const selectedCountry = useSelector(selectSelectedCountry);
  const selectedYear = useSelector(selectSelectedYear);

  const { setSelectedCountry } = useActions();

  const handleClick = (countryName: string) => {
    setSelectedCountry(countryName);
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
          const yearData = selectedYear
            ? country.data.find(d => d.year === selectedYear)
            : country.data.at(-1);

          const population = yearData?.population ?? MISSING_VALUE;

          return (
            <div key={`${country.name}-list`} className={styles.list}>
              <Table
                key={country.name}
                columns={[country.name, population, country.iso_code]}
                handleClick={() => handleClick(country.name)}
                isList
                isActive={selectedCountry === country.name}
                highlightIndex={[1]}
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
