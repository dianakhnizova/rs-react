import { forwardRef } from 'react';
import styles from './Input.module.scss';
import type { Country } from '@/sources/interfaces';
import type { PasswordStrength } from '@/sources/enums';
import { ImageFormat, InputType, List } from '@/sources/enums';
import { InfoBar } from './components/info-bar/InfoBar';
import * as React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  isDataList?: boolean;
  countries?: Country[];
  passwordStrength?: PasswordStrength;
  errorMessage?: string;
  autocomplete?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      htmlFor,
      label,
      type,
      isDataList,
      countries,
      passwordStrength,
      errorMessage,
      autocomplete,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={styles.container}>
        <label htmlFor={htmlFor}>{label}</label>
        <input
          id={htmlFor}
          ref={ref}
          type={type}
          list={isDataList ? List.COUNTRY_LIST : undefined}
          accept={
            type === InputType.FILE
              ? `${ImageFormat.PNG},${ImageFormat.JPEG}`
              : undefined
          }
          autoComplete={autocomplete}
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

        <div className={styles.infoWrapper}>
          {(errorMessage || passwordStrength) && (
            <InfoBar
              htmlFor={htmlFor}
              errorMessage={errorMessage}
              passwordStrength={passwordStrength}
            />
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
