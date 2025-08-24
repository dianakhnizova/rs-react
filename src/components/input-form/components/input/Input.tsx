import { forwardRef } from 'react';
import styles from './Input.module.scss';
import type { Country } from '@/sources/interfaces';
import { PasswordStrength } from '@/sources/enums';
import { ImageFormat, InputType, List } from '@/sources/enums';
import { InfoBar } from './components/info-bar/InfoBar';
import * as React from 'react';
import classNames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  isDataList?: boolean;
  countries?: Country[];
  passwordStrength?: PasswordStrength;
  errorMessage?: string;
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
      className,
      ...rest
    },
    ref
  ) => {
    const inputClass = classNames(className, {
      [styles.weak]: passwordStrength === PasswordStrength.WEAK,
      [styles.medium]: passwordStrength === PasswordStrength.MEDIUM,
      [styles.strong]: passwordStrength === PasswordStrength.STRONG,
    });

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
          className={inputClass}
          {...rest}
        />

        {isDataList && countries && (
          <datalist id={List.COUNTRY_LIST} data-testid="country-list">
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
