import { createContext, useContext } from 'react';
import { useAsyncStorage } from 'src/hooks/useAsyncStorage';

enum Mode {
  Light = 'light',
  Dark = 'dark',
}
const Theme = {
  [Mode.Light]: 'Light',
  [Mode.Dark]: 'Dark',
};
interface ThemeContextProps {
  currentTheme: Mode;
  setCurrentTheme?: (theme: Mode) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: Mode.Light,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useAsyncStorage('theme', Mode.Light);
  return (
    <ThemeContext.Provider
      value={{ currentTheme: (theme ?? Mode.Light) as Mode, setCurrentTheme: setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
