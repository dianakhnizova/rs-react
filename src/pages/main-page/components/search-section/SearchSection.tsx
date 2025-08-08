import React, { useState } from 'react';
import styles from './SearchSection.module.scss';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectSearchTerm } from '@/store/slices/search/selectors';
import { useActions } from '@/utils/hooks/useActions';

export const SearchSection = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const { setSearchTerm, setCurrentPage } = useActions();
  const [searchInput, setSearchInput] = useState(searchTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
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
