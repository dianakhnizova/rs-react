import { LocalStorage, Theme } from '@/sources/enums';

export const useSavedTheme = (): [Theme, (theme: Theme) => void] => {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem(LocalStorage.THEME_KEY);

    if (stored === Theme.DARK || stored === Theme.LIGHT) {
      return stored;
    }
    return Theme.DARK;
  };

  const setSavedTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
  };

  return [getInitialTheme(), setSavedTheme];
};
