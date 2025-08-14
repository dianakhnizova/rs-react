'use client';

import { LocalStorage, Theme } from '@/sources/enums';
import { useEffect, useState } from 'react';

export const useSavedTheme = (): [Theme, (theme: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    const stored = localStorage.getItem(LocalStorage.THEME_KEY);
    if (stored === Theme.DARK || stored === Theme.LIGHT) {
      setTheme(stored);
    }
  }, []);

  const setSavedTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
  };

  return [theme, setSavedTheme];
};
