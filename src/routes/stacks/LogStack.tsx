import { createStackNavigator } from '@react-navigation/stack';
import { Route } from 'src/routes/const';
import LogScreen from 'src/screens/LogScreen';

const Stack = createStackNavigator<LogStackParamList>();

const LogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Route.LOG}
    >
      <Stack.Screen name={Route.LOG} component={LogScreen} />
    </Stack.Navigator>
  );
};

export { LogStack };
