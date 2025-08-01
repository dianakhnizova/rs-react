import type { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ label, ...rest }: Props) => {
  return (
    <label
      onClick={event => event.stopPropagation()}
      className={styles.checkboxLabel}
    >
      <input type="checkbox" className={styles.checkbox} {...rest} />
      {label}
    </label>
  );
};
