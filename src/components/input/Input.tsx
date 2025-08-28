import classNames from 'classnames';
import styles from './Input.module.scss';
import { FC } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  htmlFor: string;
  label: string;
  isCheckbox?: boolean;
}

export const Input: FC<Props> = ({
  id,
  htmlFor,
  label,
  isCheckbox,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        {...rest}
        className={classNames(isCheckbox ? styles.checkbox : styles.input)}
      />

      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
