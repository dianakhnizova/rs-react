import { forwardRef } from 'react';
import styles from './Input.module.scss';
import type { Country } from '@/sources/interfaces';
import { List } from '@/sources/enums';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  isDataList?: boolean;
  countries?: Country[];
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ htmlFor, label, isDataList, countries, className, ...rest }, ref) => (
    <div className={styles.container}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        ref={ref}
        list={isDataList ? List.COUNTRY_LIST : undefined}
        className={className}
        {...rest}
      />

      {isDataList && countries && (
        <datalist id={List.COUNTRY_LIST}>
          {countries.map(country => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </datalist>
      )}
    </div>
  )
);

Input.displayName = 'Input';
