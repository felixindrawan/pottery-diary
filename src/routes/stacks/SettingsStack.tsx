import { createStackNavigator } from '@react-navigation/stack';
import { Route } from 'src/routes/const';
import SettingsScreen from 'src/screens/SettingsScreen';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Route.SETTINGS}
    >
      <Stack.Screen name={Route.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export { SettingsStack };
