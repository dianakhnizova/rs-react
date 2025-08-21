import { forwardRef } from 'react';
import styles from './GenderInput.module.scss';
import { messages } from '@/sources/messages';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
}

export const GenderInput = forwardRef<HTMLInputElement, Props>(
  ({ htmlFor, label, className, ...rest }, ref) => {
    {
      return (
        <div className={styles.container}>
          <span>{label}</span>

          <div className={styles.genderContainer}>
            <div className={styles.radioButtonContainer}>
              <label htmlFor={`${htmlFor}-male`}>{messages.label.male}</label>
              <input
                id={`${htmlFor}-male`}
                ref={ref}
                value="male"
                className={className}
                {...rest}
              />
            </div>

            <div className={styles.radioButtonContainer}>
              <label htmlFor={`${htmlFor}-female`}>
                {messages.label.female}
              </label>
              <input
                id={`${htmlFor}-female`}
                ref={ref}
                value="female"
                className={className}
                {...rest}
              />
            </div>
          </div>
        </div>
      );
    }
  }
);

GenderInput.displayName = 'GenderForm';
