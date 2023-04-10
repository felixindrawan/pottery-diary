import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';
import { Color, COLORS } from 'src/utils/styles';
import useSecureStore from './useSecureStore';

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
  currentTheme: Mode.Dark,
  currentPrimaryColor: COLORS[Color.PRIMARY_MAIN],
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useSecureStore('theme', Mode.Dark);
  const [primaryColor, setPrimaryColor] = useSecureStore(
    'primaryColor',
    COLORS[Color.PRIMARY_MAIN],
  );
  const onThemeUpdate = useCallback(
    (lightMode: boolean) => setTheme(lightMode ? Mode.Light : Mode.Dark),
    [setTheme],
  );
  const onPrimaryColorUpdate = useCallback(
    (newPrimaryColor: string) => setPrimaryColor(newPrimaryColor),
    [setPrimaryColor],
  );

  const context = useMemo(
    () => ({
      currentTheme: (theme ?? Mode.Dark) as Mode,
      onThemeUpdate,
      currentPrimaryColor: primaryColor ?? COLORS[Color.PRIMARY_MAIN],
      onPrimaryColorUpdate,
    }),
    [theme, onThemeUpdate, primaryColor, onPrimaryColorUpdate],
  );
  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function getColor(mode: Mode) {
  return mode === Mode.Light ? COLORS[Color.NEUTRAL_100] : COLORS[Color.NEUTRAL_10];
}

export function getBGColor(mode: Mode) {
  return mode === Mode.Light ? COLORS[Color.NEUTRAL_10] : COLORS[Color.NEUTRAL_100];
}
