import styles from './Select.module.scss';
import React, { FC } from 'react';
import { messages } from '@/sources/messages';

interface Props {
  setSelectedValue: (value: number | null) => void;
  options: number[];
}

export const Select: FC<Props> = ({ setSelectedValue, options }) => {
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedValue(value ? Number(value) : null);
  };

  return (
    <select defaultValue="" onChange={onSelect} className={styles.select}>
      <option value="">{messages.select}</option>

      {options.map(option => (
        <option key={option} value={option} className={styles.option}>
          {option}
        </option>
      ))}
    </select>
  );
};
