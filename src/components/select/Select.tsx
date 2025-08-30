import styles from './Select.module.scss';
import React, { FC, memo, useCallback } from 'react';

interface Props {
  setSelectedValue: (value: string | null) => void;
  options: (number | string)[];
  defaultValue?: string | number | null;
}

export const Select: FC<Props> = memo(
  ({ setSelectedValue, options, defaultValue }) => {
    const onSelect = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        setSelectedValue(value || null);
      },
      [setSelectedValue]
    );

    return (
      <select defaultValue="" onChange={onSelect} className={styles.select}>
        {defaultValue && <option value="">{defaultValue}</option>}

        {options.map(option => (
          <option key={option} value={option} className={styles.option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);
