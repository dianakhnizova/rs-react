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

  const toggleTheme = () => {
    setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
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
