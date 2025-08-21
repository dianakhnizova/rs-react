import type { FC } from 'react';
import styles from './GenderInput.module.scss';
import { messages } from '@/sources/messages';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  maleRef: React.RefObject<HTMLInputElement | null>;
  femaleRef: React.RefObject<HTMLInputElement | null>;
}

export const GenderInput: FC<Props> = ({
  htmlFor,
  label,
  maleRef,
  femaleRef,
  className,
  ...rest
}) => (
  <div className={styles.container}>
    <label>{label}</label>

    <div className={styles.genderContainer}>
      <div className={styles.radioButtonContainer}>
        <label htmlFor={`${htmlFor}-male`}>{messages.label.male}</label>
        <input
          id={`${htmlFor}-male`}
          name={htmlFor}
          ref={maleRef}
          value="male"
          className={className}
          {...rest}
        />
      </div>

      <div className={styles.radioButtonContainer}>
        <label htmlFor={`${htmlFor}-female`}>{messages.label.female}</label>
        <input
          id={`${htmlFor}-female`}
          name={htmlFor}
          ref={femaleRef}
          value="female"
          className={className}
          {...rest}
        />
      </div>
    </div>
  </div>
);
