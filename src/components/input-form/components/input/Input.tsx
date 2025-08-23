import { forwardRef } from 'react';
import styles from './Input.module.scss';
import type { Country } from '@/sources/interfaces';
import {
  ImageFormat,
  InputType,
  List,
  PasswordStrength,
} from '@/sources/enums';
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

        {(errorMessage || passwordStrength) && (
          <div className={styles.info}>
            <span className={styles.error}>{errorMessage}</span>

            {htmlFor === InputType.PASSWORD && (
              <div className={styles.strength}>
                <div
                  className={classNames(
                    styles.bar,
                    passwordStrength ? styles[passwordStrength] : styles.weak
                  )}
                />

                <span className={styles.label}>
                  {passwordStrength === PasswordStrength.WEAK &&
                    PasswordStrength.WEAK}
                  {passwordStrength === PasswordStrength.MEDIUM &&
                    PasswordStrength.MEDIUM}
                  {passwordStrength === PasswordStrength.STRONG &&
                    PasswordStrength.STRONG}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
