import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from 'src/components/Navigation/Stack';
import RootNavigator from 'src/routes/RootNavigator';

export default function Pages() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
