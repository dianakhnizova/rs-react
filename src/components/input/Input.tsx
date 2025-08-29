import classNames from 'classnames';
import styles from './Input.module.scss';
import { FC } from 'react';
import { messages } from '@/sources/messages';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  htmlFor?: string;
  label?: string;
  isCheckbox?: boolean;
  isRadio?: boolean;
  isLabel?: boolean;
  isSearch?: boolean;
  setInput?: (value: string) => void;
}

export const Input: FC<Props> = ({
  id,
  htmlFor,
  label,
  isCheckbox,
  isRadio,
  isLabel,
  isSearch,
  setInput,
  ...rest
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (setInput) {
      setInput(value);
    }

    if (rest.onChange) {
      rest.onChange(event);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          {...rest}
          onChange={handleInputChange}
          className={classNames(
            isCheckbox ? styles.checkbox : isRadio ? styles.radio : styles.input
          )}
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
