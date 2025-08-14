'use client';

import { LocalStorage } from '@/sources/enums';
import { useState } from 'react';
import { useAppSelector } from './useAppSelector';
import { selectSearchTerm } from '@/store/slices/search/selectors';

export const useSearchQuery = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const [searchInput, setSearchInput] = useState(searchTerm);

  const saveSearch = (value: string) => {
    localStorage.setItem(LocalStorage.SEARCH_KEY, value.trim());
    setSearchInput(value);
  };

  return { searchInput, setSearchInput: saveSearch };
};
