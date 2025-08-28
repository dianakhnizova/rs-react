import classNames from 'classnames';
import styles from './Input.module.scss';
import { FC } from 'react';
import { messages } from '@/sources/messages';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  htmlFor?: string;
  label?: string;
  isCheckbox?: boolean;
  isLabel?: boolean;
  isSearch?: boolean;
}

export const Input: FC<Props> = ({
  id,
  htmlFor,
  label,
  isCheckbox,
  isLabel,
  isSearch,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          {...rest}
          className={classNames(isCheckbox ? styles.checkbox : styles.input)}
        />

        {isSearch && (
          <img
            src="search.svg"
            alt={messages.alt.search}
            className={styles.image}
          />
        )}
      </div>

      {isLabel && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};
