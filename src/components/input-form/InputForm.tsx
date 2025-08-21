import React, { forwardRef } from 'react';
import styles from './InputForm.module.scss';
import classNames from 'classnames';
import { Variant } from '@/sources/enums';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  variant?: Variant;
}

export const InputForm = forwardRef<HTMLInputElement, Props>(
  ({ htmlFor, label, className, variant = Variant.PRIMARY, ...rest }, ref) => {
    return (
      <div className={styles.container}>
        <label
          htmlFor={htmlFor}
          className={classNames(styles.label, styles[variant], className)}
        >
          {label}
        </label>
        <input
          id={htmlFor}
          ref={ref}
          className={classNames(styles.input, styles[variant], className)}
          {...rest}
        />
      </div>
    );
  }
);

InputForm.displayName = 'InputForm';
