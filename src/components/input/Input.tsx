import classNames from 'classnames';
import styles from './Input.module.scss';
import { FC, memo, useCallback } from 'react';
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

export const Input: FC<Props> = memo(
  ({
    id,
    htmlFor,
    label,
    isCheckbox,
    isRadio,
    isLabel,
    isSearch,
    setInput,
    onChange,
    ...rest
  }) => {
    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setInput?.(value);
        onChange?.(event);
      },
      [setInput, onChange]
    );

    return (
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            id={id}
            {...rest}
            onChange={handleInputChange}
            className={classNames(
              isCheckbox
                ? styles.checkbox
                : isRadio
                  ? styles.radio
                  : styles.input
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
  }
);
