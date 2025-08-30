import { Table } from '../table/Table';
import styles from './CountryList.module.scss';
import { MISSING_VALUE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import { useSelector } from 'react-redux';
import { selectSelectedYear } from '@/store/slices/year/selectors';
import { CountryData } from '@/sources/interfaces';
import { FC, useMemo, useState } from 'react';
import { Button } from '../button/Button';
import { ColumnPicker } from '../column-piker/ColumnPicker';
import { Modal } from '../modal/Modal';
import {
  selectColumnKeys,
  selectColumnLabels,
} from '@/store/slices/selected-column/selectors';
import { extractYearDataValues } from '@/utils/extractYearDataValues';
import { getHighlightIndex } from '@/utils/getHighlightIndex';

interface Props {
  countries: CountryData[];
}

export const CountryList: FC<Props> = ({ countries }) => {
  const selectedYear = useSelector(selectSelectedYear);
  const columnLabels = useSelector(selectColumnLabels);
  const columnKeys = useSelector(selectColumnKeys);

  const [isdModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onSelect = () => {
    setIsModalOpen(false);
  };

  const headers = [
    messages.tableHeaderCountryList.labelName,
    messages.tableHeaderCountryList.labelISO,
    messages.tableHeaderCountryList.labelPopulation,
    messages.tableHeaderCountryList.labelYear,
    messages.tableHeaderCountryList.labelCo2,
    messages.tableHeaderCountryList.labelCo2PerCapita,
    ...columnLabels,
  ];

  const rows = useMemo(() => {
    return countries.map(country => {
      const yearData = selectedYear
        ? country.data.find(d => d.year === selectedYear)
        : country.data.at(-1);

      const population = yearData?.population ?? MISSING_VALUE;
      const year = yearData?.year ?? MISSING_VALUE;
      const cementCo2 = yearData?.cement_co2 ?? MISSING_VALUE;
      const cementCo2PerCapita =
        yearData?.cement_co2_per_capita ?? MISSING_VALUE;

      return [
        country.name,
        country.iso_code,
        population,
        year,
        cementCo2,
        cementCo2PerCapita,
        ...extractYearDataValues(yearData, columnKeys),
      ];
    });
  }, [countries, selectedYear, columnKeys]);

  const highlightIndex = getHighlightIndex(columnKeys.length);

  return (
    <div className={styles.container}>
      <Button onClick={handleOpenModal}>{messages.button.select}</Button>

      <Modal isOpen={isdModalOpen} onClose={onSelect}>
        <ColumnPicker onSelect={onSelect} />
      </Modal>

      <div className={styles.listContainer}>
        <Table headers={headers} rows={rows} highlightIndex={highlightIndex} />
      </div>
    </div>
  );
};
