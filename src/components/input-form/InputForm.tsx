import React, { forwardRef } from 'react';
import styles from './InputForm.module.scss';
import classNames from 'classnames';
import { Variant } from '@/sources/enums';
import { GenderInput } from './components/gender-input/GenderInput';
import { Input } from './components/text-input/Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  type: string;
  variant?: Variant;
  isGender?: boolean;
  maleRef?: React.RefObject<HTMLInputElement | null>;
  femaleRef?: React.RefObject<HTMLInputElement | null>;
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
      maleRef,
      femaleRef,
      ...rest
    },
    ref
  ) => {
    const inputClassName = classNames(styles.input, styles[variant], className);

    return isGender ? (
      <GenderInput
        htmlFor={htmlFor}
        label={label}
        type={type}
        maleRef={maleRef!}
        femaleRef={femaleRef!}
        className={inputClassName}
        {...rest}
      />
    ) : (
      <Input
        htmlFor={htmlFor}
        label={label}
        type={type}
        ref={ref}
        className={inputClassName}
        {...rest}
      />
    );
  }
);

InputForm.displayName = 'InputForm';
