import { useSelector } from 'react-redux';
import styles from './Select.module.scss';
import { selectYears } from '@/store/slices/year/selectors';
import { useActions } from '@/utils/hooks/useActions';
import React, { useState } from 'react';
import { messages } from '@/sources/messages';

export const Select = () => {
  const years = useSelector(selectYears);
  const [selected, setSelected] = useState('');

  const { setSelectedYear } = useActions();

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);

    if (value) {
      setSelectedYear(Number(value));
    } else {
      setSelectedYear(null);
    }
  };

  return (
    <select value={selected} onChange={onSelect} className={styles.select}>
      <option value="">{messages.select}</option>

      {years.map(year => (
        <option key={year} className={styles.option}>
          {year}
        </option>
      ))}
    </select>
  );
};
