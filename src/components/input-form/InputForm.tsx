import React, { forwardRef } from 'react';
import styles from './InputForm.module.scss';
import classNames from 'classnames';
import { Variant } from '@/sources/enums';
import { GenderInput } from './components/gender-input/GenderInput';
import { Input } from './components/text-input/Input';
import type { Country } from '@/sources/interfaces';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  variant?: Variant;
  isGender?: boolean;
  isDataList?: boolean;
  countries?: Country[];
  maleRef?: React.RefObject<HTMLInputElement | null>;
  femaleRef?: React.RefObject<HTMLInputElement | null>;
}

export const InputForm = forwardRef<HTMLInputElement, Props>(
  (
    {
      htmlFor,
      label,
      className,
      variant = Variant.PRIMARY,
      isGender,
      isDataList,
      countries,
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
        maleRef={maleRef!}
        femaleRef={femaleRef!}
        className={inputClassName}
        {...rest}
      />
    ) : (
      <Input
        htmlFor={htmlFor}
        label={label}
        ref={ref}
        isDataList={isDataList}
        countries={countries}
        className={inputClassName}
        {...rest}
      />
    );
  }
);

InputForm.displayName = 'InputForm';
