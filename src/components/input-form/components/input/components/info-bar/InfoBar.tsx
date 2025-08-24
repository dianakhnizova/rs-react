import { InputType, PasswordStrength } from '@/sources/enums';
import styles from './InfoBar.module.scss';
import classNames from 'classnames';
import type { FC } from 'react';

interface Props {
  htmlFor: string;
  errorMessage?: string;
  passwordStrength?: PasswordStrength;
}

export const InfoBar: FC<Props> = ({
  htmlFor,
  errorMessage,
  passwordStrength,
}) => (
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
          {passwordStrength === PasswordStrength.WEAK && PasswordStrength.WEAK}
          {passwordStrength === PasswordStrength.MEDIUM &&
            PasswordStrength.MEDIUM}
          {passwordStrength === PasswordStrength.STRONG &&
            PasswordStrength.STRONG}
        </span>
      </div>
    )}
  </div>
);
