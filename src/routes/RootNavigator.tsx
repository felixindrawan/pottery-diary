
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from 'src/routes/const';
import { BottomTab } from 'src/routes/BottomTab';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth */}
        {/* <Stack.Screen name={} component={} options={{ headerShown: false }} /> */}
        {/* BottomTab */}
        <RootStack.Screen name={Route.BOTTOM_TAB} component={BottomTab} />
        {/* Log */}
        {/* <Stack.Screen name={Route.LOG_STACK} component={LogStack} /> */}
        {/* TODO error screen */}
        {/* <Stack.Screen name={} component={} />  */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
