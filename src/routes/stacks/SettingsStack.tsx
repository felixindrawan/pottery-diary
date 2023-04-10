import { createStackNavigator } from '@react-navigation/stack';
import { Route } from 'src/routes/const';
import SettingsScreen from 'src/screens/SettingsScreen';
import TestScreen from 'src/screens/SettingsScreen/TestScreen';
import { SettingsStackParamList } from '../types';

const Stack = createStackNavigator<SettingsStackParamList>();

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Route.SETTINGS}
    >
      <Stack.Screen name={Route.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={Route.TEST_SCREEN} component={TestScreen} />
    </Stack.Navigator>
  );
}

export default SettingsStack;
