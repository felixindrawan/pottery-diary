
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from 'src/routes/const';
import { BottomTab } from 'src/routes/BottomTab';
import { RouteConstants } from './RouteConstants';
import { LogStack } from './stacks/LogStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth */}
        {/* <Stack.Screen name={} component={} options={{ headerShown: false }} /> */}
        {/* BottomTab */}
        <RootStack.Screen name={Route.BOTTOM_TAB} component={BottomTab} options={{ headerShown: false }} />
        {/* Log */}
        {/* <Stack.Screen name={Route.LOG_STACK} component={LogStack} /> */}
        {/* TODO error screen */}
        {/* <Stack.Screen name={} component={} />  */}
      </RootStack.Navigator>
    </NavigationContainer>
    // <Stack.Navigator>
    //   {/* Auth */}
    //   {/* <Stack.Screen name={} component={} options={{ headerShown: false }} /> */}
    //   {/* BottomTab */}
    //   <Stack.Screen
    //     name={RouteConstants.bottomTab}
    //     component={BottomTab}
    //     options={{ headerShown: false }}
    //   />
    //   {/* Log */}
    //   <Stack.Screen
    //     name={RouteConstants.logStack}
    //     component={LogStack}
    //     options={{ headerShown: false }}
    //   />
    //   {/* TODO error screen */}
    //   {/* <Stack.Screen name={} component={} />  */}
    // </Stack.Navigator>
  );
};

export default RootNavigator;
