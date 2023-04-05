import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LogPage from 'src/pages/CreateLogPage';
import { RouteConstants } from '../RouteConstants';
import { LogStackParamList } from '../types';

const Stack = createStackNavigator<LogStackParamList>();

function LogStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteConstants.log}
    >
      <Stack.Screen name={RouteConstants.log} component={LogPage} />
    </Stack.Navigator>
  );
}

export default LogStack;
