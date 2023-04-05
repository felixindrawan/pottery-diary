import { createStackNavigator } from '@react-navigation/stack';
import CreateLogPage from 'src/pages/CreateLogPage';
import { RouteConstants } from './../RouteConstants';

const Stack = createStackNavigator<LogStackParamList>();

function LogStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteConstants.createLog}
    >
      <Stack.Screen name={RouteConstants.createLog} component={CreateLogPage} />
    </Stack.Navigator>
  );
}

export {LogStack};
