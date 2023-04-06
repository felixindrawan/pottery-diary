import { createStackNavigator } from '@react-navigation/stack';
import { Route } from 'src/routes/const';
import { SettingsScreen } from 'src/screens/SettingsScreen';
import { SettingsStackParamList } from '../types';
import { TestScreen } from 'src/screens/SettingsScreen/TestScreen';
import { APP_ENV } from '@env';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      
      initialRouteName={Route.SETTINGS}
    >
      <Stack.Screen name={Route.SETTINGS} component={SettingsScreen} options={{headerShown: false}} />
<Stack.Screen name={Route.TEST_SCREEN} component={TestScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export { SettingsStack };

