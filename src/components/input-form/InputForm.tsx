import React, { forwardRef } from 'react';
import styles from './InputForm.module.scss';
import classNames from 'classnames';
import { Variant } from '@/sources/enums';
import { GenderInput } from './gender-form/GenderInput';
import { messages } from '@/sources/messages';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  type: string;
  variant?: Variant;
  isGender?: boolean;
}

export const InputForm = forwardRef<HTMLInputElement, Props>(
  (
    {
      htmlFor,
      label,
      type,
      className,
      variant = Variant.PRIMARY,
      isGender,
      ...rest
    },
    ref
  ) => {
    {
      return isGender ? (
        <GenderInput
          htmlFor={htmlFor}
          label={messages.label.gender}
          type={type}
        />
      ) : (
        <div className={styles.container}>
          <label
            htmlFor={htmlFor}
            className={classNames(styles.label, styles[variant], className)}
          >
            {label}
          </label>
          <input
            id={htmlFor}
            type={type}
            ref={ref}
            className={classNames(styles.input, styles[variant], className)}
            {...rest}
          />
        </div>
      );
    }
  }
);

InputForm.displayName = 'InputForm';
