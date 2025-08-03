import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LocalStorage } from '@/sources/enums';

export const useSearchQuery = (localStorageKey = LocalStorage.SEARCH_KEY) => {
  const [searchTerm, setSearchTerm] = useState<string>(
    (localStorage.getItem(LocalStorage.SEARCH_KEY) || '').trim()
  );

  const { detailsId } = useParams();
  const navigate = useNavigate();

  const handleSearchQuery = useCallback(
    (newSearchTerm: string) => {
      const trimmedSearchTerm = newSearchTerm.trim();
      setSearchTerm(trimmedSearchTerm);
      localStorage.setItem(localStorageKey, trimmedSearchTerm);

      const newUrl = detailsId ? `/1/${detailsId}` : '/1';
      void navigate(newUrl);
    },

    [detailsId, navigate, localStorageKey]
  );

  return { searchTerm, handleSearchQuery };
};
