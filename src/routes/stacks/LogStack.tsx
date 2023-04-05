import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomePage from 'src/pages/HomePage';
import { RouteConstants } from '../RouteConstants';
import { LogStackParamList } from '../types';

const Stack = createStackNavigator<LogStackParamList>();

function LogStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteConstants.home}
    >
      <Stack.Screen name={RouteConstants.home} component={HomePage} />
    </Stack.Navigator>
  );
}

export default LogStack;
