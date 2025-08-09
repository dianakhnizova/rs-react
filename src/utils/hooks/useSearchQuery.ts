import { LocalStorage } from '@/sources/enums';
import { useState } from 'react';

export const useSearchQuery = (initialValue = '') => {
  const [searchInput, setSearchInput] = useState(initialValue);

  const saveSearch = (value: string) => {
    localStorage.setItem(LocalStorage.SEARCH_KEY, value.trim());
    setSearchInput(value);
  };

  return { searchInput, setSearchInput: saveSearch };
};
