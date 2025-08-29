import { Table } from '../table/Table';
import styles from './CountryList.module.scss';
import { MISSING_VALUE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import { useSelector } from 'react-redux';
import { selectSelectedYear } from '@/store/slices/year/selectors';
import { CountryData } from '@/sources/interfaces';
import { FC, useState } from 'react';
import { Button } from '../button/Button';
import { ColumnPicker } from '../column-piker/ColumnPicker';
import { Modal } from '../modal/Modal';
import { selectColumns } from '@/store/slices/selected-column/selectors';

interface Props {
  countries: CountryData[];
}

export const CountryList: FC<Props> = ({ countries }) => {
  const selectedYear = useSelector(selectSelectedYear);
  const selectedColumns = useSelector(selectColumns);

  const [isdModalOpen, setIsModalOpen] = useState(false);

  const columnLabels = selectedColumns.map(column => column.label);
  const selectedInfo = selectedColumns.map(column => column.key);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSelect = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleOpenModal}>{messages.button.select}</Button>

      <Modal isOpen={isdModalOpen} onClose={handleCloseModal}>
        <ColumnPicker onSelect={onSelect} />
      </Modal>

      <Table
        columns={[
          messages.tableHeaderCountryList.labelName,
          messages.tableHeaderCountryList.labelISO,
          messages.tableHeaderCountryList.labelPopulation,

          messages.tableHeaderCountryList.labelYear,
          messages.tableHeaderCountryList.labelCo2,
          messages.tableHeaderCountryList.labelCo2PerCapita,
          ...columnLabels,
        ]}
      />

      <div className={styles.divider} />

      <div className={styles.listContainer}>
        {countries.map(country => {
          const yearData = selectedYear
            ? country.data.find(data => data.year === selectedYear)
            : country.data.at(-1);

          const population = yearData?.population ?? MISSING_VALUE;
          const year = yearData?.year ?? MISSING_VALUE;
          const cementCo2 = yearData?.cement_co2 ?? MISSING_VALUE;
          const cementCo2PerCapita =
            yearData?.cement_co2_per_capita ?? MISSING_VALUE;

          return (
            <div key={`${country.name}-list`} className={styles.list}>
              <Table
                key={country.name}
                columns={[
                  country.name,
                  country.iso_code,
                  population,
                  year,
                  cementCo2,
                  cementCo2PerCapita,
                  ...selectedInfo.map(
                    key =>
                      yearData?.[key as keyof typeof yearData] ?? MISSING_VALUE
                  ),
                ]}
                isList
                highlightIndex={Array.from(
                  { length: 6 + selectedInfo.length },
                  (_, i) => i
                ).slice(2)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
