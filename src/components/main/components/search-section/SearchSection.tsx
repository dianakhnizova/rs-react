import React, { useState } from 'react';
import styles from './SearchSection.module.scss';
import { messages } from './messages';
import { Button } from '@/components/button/Button';

interface Props {
  onSearch: (value: string) => void;
}

export const SearchSection = ({ onSearch }: Props) => {
  const [searchInput, setSearchInput] = useState<string>(
    (localStorage.getItem('searchInput') || '').trim()
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
  };

  const handleSearchClick = () => {
    localStorage.setItem('searchInput', searchInput.trim());
    onSearch(searchInput.trim());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearchClick();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        onChange={handleInputChange}
        type="text"
        value={searchInput}
        placeholder={messages.inputPlaceholder}
        className={styles.input}
      />

      <Button className={styles.button}>{messages.searchButton}</Button>
    </form>
  );
};
