import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomePage from 'src/pages/HomePage';
import { RouteConstants } from './../RouteConstants';

const Stack = createStackNavigator<HomeStackParamList>();

function HomeStack() {
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

export { HomeStack};
