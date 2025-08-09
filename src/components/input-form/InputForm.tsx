import React, { FC, ReactNode } from 'react';
import styles from './InputForm.module.scss';
import { Button } from '@/components/button/Button';
import classNames from 'classnames';

interface Props {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  formProps?: React.HtmlHTMLAttributes<HTMLFormElement>;
  setSearchInput?: (value: string) => void;
  onFormSubmitHandler: () => void;
  isShowButton?: boolean;
  buttonLabel?: ReactNode;
}

export const InputForm: FC<Props> = ({
  inputProps,
  formProps,
  setSearchInput,
  onFormSubmitHandler,
  isShowButton,
  buttonLabel,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchInput) {
      setSearchInput(event.target.value);
    }
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFormSubmitHandler();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className={classNames(styles.container, formProps?.className)}
      {...formProps}
    >
      <input
        onChange={handleInputChange}
        className={classNames(styles.input || inputProps?.className)}
        {...inputProps}
      />

      {isShowButton && <Button className={styles.button}>{buttonLabel}</Button>}
    </form>
  );
};
