import React, { forwardRef } from 'react';
import styles from './InputForm.module.scss';
import classNames from 'classnames';
import { Variant } from '@/sources/enums';
import { GenderInput } from './components/gender-input/GenderInput';
import { Input } from './components/input/Input';
import type { Country, InputFields, UserForm } from '@/sources/interfaces';
import type { UseFormRegister } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  variant?: Variant;
  isGender?: boolean;
  isDataList?: boolean;
  countries?: Country[];
  maleRef?: React.RefObject<HTMLInputElement | null>;
  femaleRef?: React.RefObject<HTMLInputElement | null>;
  register?: UseFormRegister<InputFields>;
  passwordStrength?: PasswordStrength;
  errorMessage?: string;
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
      register,
      passwordStrength,
      errorMessage,
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputClassName = classNames(styles.input, styles[variant], className);

    return isGender ? (
      <GenderInput
        htmlFor={htmlFor}
        label={label}
        maleRef={maleRef}
        femaleRef={femaleRef}
        className={inputClassName}
        register={register}
        {...rest}
      />
    ) : (
      <Input
        htmlFor={htmlFor}
        label={label}
        ref={register ? undefined : ref}
        isDataList={isDataList}
        countries={countries}
        passwordStrength={passwordStrength}
        errorMessage={errorMessage}
        onChange={onChange}
        className={inputClassName}
        {...(register ? register(htmlFor as keyof UserForm) : {})}
        {...rest}
      />
    );
  }
);

InputForm.displayName = 'InputForm';
