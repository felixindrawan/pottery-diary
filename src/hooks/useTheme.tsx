import { createContext, useCallback, useContext, useState } from 'react';
import { useAsyncStorage } from 'src/hooks/useAsyncStorage';
import { Color, COLORS } from 'src/utils/styles';

export enum Mode {
  Light = 'light',
  Dark = 'dark',
}
const MODE_LABEL: Record<Mode, string> = {
  [Mode.Light]: 'Light',
  [Mode.Dark]: 'Dark',
};
interface ThemeContextProps {
  currentTheme: Mode;
  onThemeUpdate?: (darkMode: boolean) => void;
  currentPrimaryColor: string;
  onPrimaryColorUpdate?: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: Mode.Light,
  currentPrimaryColor: COLORS[Color.PRIMARY_MAIN],
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useAsyncStorage('theme', Mode.Light);
  const [primaryColor, setPrimaryColor] = useAsyncStorage(
    'primaryColor',
    COLORS[Color.PRIMARY_MAIN],
  );
  const onThemeUpdate = useCallback(
    (darkMode: boolean) => setTheme(darkMode ? Mode.Dark : Mode.Light),
    [],
  );
  const onPrimaryColorUpdate = useCallback(
    (newPrimaryColor: string) => setPrimaryColor(newPrimaryColor),
    [],
  );
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: (theme ?? Mode.Light) as Mode,
        onThemeUpdate,
        currentPrimaryColor: primaryColor ?? COLORS[Color.PRIMARY_MAIN],
        onPrimaryColorUpdate,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
