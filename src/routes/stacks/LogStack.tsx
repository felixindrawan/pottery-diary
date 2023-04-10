import { createStackNavigator } from '@react-navigation/stack';
import { Route } from 'src/routes/const';
import LogScreen from 'src/screens/LogScreen';
import { MediaPermissionsProvider } from 'src/hooks/useMediaPermissions';
import { LogStackParamList } from '../types';

const Stack = createStackNavigator<LogStackParamList>();

function LogStack() {
  return (
    <MediaPermissionsProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={Route.LOG}
      >
        <Stack.Screen name={Route.LOG} component={LogScreen} />
      </Stack.Navigator>
    </MediaPermissionsProvider>
  );
}

export default LogStack;
