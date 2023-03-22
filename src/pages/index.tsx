import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from 'src/components/Navigation/Stack';

export default function Pages() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
