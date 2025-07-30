import type { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';
import classNames from 'classnames';

type Props = {
  label?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ label, className, onChange, ...rest }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onChange?.(event);
  };

  return (
    <div
      onClick={event => event.stopPropagation()}
      className={classNames(styles.wrapper, styles.checkboxWrapper, className)}
    >
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          onChange={handleChange}
          className={styles.checkbox}
          {...rest}
        />
        {label}
      </label>
    </div>
  );
};
