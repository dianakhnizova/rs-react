'use client';

import { Theme } from '@/sources/enums';
import { messages } from '@/sources/messages';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<Props | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === Theme.DARK || stored === Theme.LIGHT) {
      setTheme(stored);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(messages.errorThemeContext);
  }
  return context;
};
