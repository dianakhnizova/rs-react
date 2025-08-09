import React, { FC } from 'react';
import styles from './SearchBar.module.scss';
import { messages } from './messages';
import { Button } from '@/components/button/Button';

interface Props extends React.HtmlHTMLAttributes<HTMLFormElement> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  setSearchInput?: (value: string) => void;
  handleSubmit: () => void;
}

export const SearchBar: FC<Props> = ({
  inputProps,
  setSearchInput,
  handleSubmit,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (setSearchInput) setSearchInput(value);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onFormSubmit} className={styles.container}>
      <input
        onChange={handleInputChange}
        className={styles.input}
        {...inputProps}
      />

      <Button className={styles.button}>{messages.searchButton}</Button>
    </form>
  );
};
