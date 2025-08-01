import type { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ label, ...rest }: Props) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input type="checkbox" className={styles.checkbox} {...rest} />
      {label && <label className={styles.checkboxLabel}>{label}</label>}
    </div>
  );
};
