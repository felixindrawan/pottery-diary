import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from 'src/routes/RootNavigator';

export default function Pages() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
