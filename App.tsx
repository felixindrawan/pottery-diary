import { ThemeProvider } from 'src/hooks/useTheme';
import HomePage from 'src/pages/HomePage';

export default function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
