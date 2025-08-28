import { messages } from '@/sources/messages';
import { Table } from '../table/Table';
import styles from './CountryInfo.module.scss';
import { CountryData } from '@/sources/interfaces';
import { FC, useState } from 'react';
import { MISSING_VALUE } from '@/sources/constants';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';
import { ColumnPicker } from '../column-piker/ColumnPicker';

interface Props {
  info: CountryData[];
}

export const CountryInfo: FC<Props> = ({ info }) => {
  const [isdModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleOpenModal}>{messages.button.select}</Button>

      <Modal isOpen={isdModalOpen} onClose={handleCloseModal}>
        <ColumnPicker />
      </Modal>

      <Table
        columns={[
          messages.tableHeaderCountryInfo.labelYear,
          messages.tableHeaderCountryInfo.labelPopulation,
          messages.tableHeaderCountryInfo.labelCo2,
          messages.tableHeaderCountryInfo.labelCo2PerCapita,
        ]}
      />

      <div className={styles.divider} />

      <div className={styles.infoContainer}>
        {info.map(country =>
          country.data.map((info, index) => {
            const countryInfo: (string | number)[] = [
              info.year,
              info.population ?? MISSING_VALUE,
              info.cement_co2 ?? MISSING_VALUE,
              info.cement_co2_per_capita ?? MISSING_VALUE,
            ];

            return (
              <Table
                key={`${country.name}-info-${index}`}
                columns={countryInfo}
                isInfoList
              />
            );
          })
        )}
      </div>
    </div>
  );
};
