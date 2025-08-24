import type { FC } from 'react';
import styles from './GenderInput.module.scss';
import { messages } from '@/sources/messages';
import type { UseFormRegister } from 'react-hook-form';
import type { FullUserForm } from '@/sources/interfaces';
import { Gender, InputType } from '@/sources/enums';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  htmlFor: keyof FullUserForm;
  label: string;
  register?: UseFormRegister<FullUserForm>;
  maleRef?: React.RefObject<HTMLInputElement | null>;
  femaleRef?: React.RefObject<HTMLInputElement | null>;
  errorMessage?: string;
}

export const GenderInput: FC<Props> = ({
  htmlFor,
  label,
  register,
  maleRef,
  femaleRef,
  errorMessage,
  className,
  ...rest
}) => (
  <div className={styles.container}>
    <label>{label}</label>

    <div className={styles.genderContainer}>
      <div className={styles.radioButtonContainer}>
        <label htmlFor={`${htmlFor}-${Gender.MALE}`}>
          {messages.label.male}
        </label>
        <input
          id={`${htmlFor}-${Gender.MALE}`}
          value={Gender.MALE}
          name={htmlFor}
          type={InputType.RADIO}
          className={className}
          ref={register ? undefined : maleRef}
          {...(register ? register(htmlFor) : rest)}
        />
      </div>

      <div className={styles.radioButtonContainer}>
        <label htmlFor={`${htmlFor}-${Gender.FEMALE}`}>
          {messages.label.female}
        </label>
        <input
          id={`${htmlFor}-${Gender.FEMALE}`}
          value={Gender.FEMALE}
          name={htmlFor}
          type={InputType.RADIO}
          className={className}
          ref={register ? undefined : femaleRef}
          {...(register ? register(htmlFor) : rest)}
        />
      </div>
    </div>

    {errorMessage && <span className={styles.error}>{errorMessage}</span>}
  </div>
);
