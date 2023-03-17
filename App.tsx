import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'src/hooks/useTheme';
import Pages from 'src/pages';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <Pages />
    </ThemeProvider>
  );
}
