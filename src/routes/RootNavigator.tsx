import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTab } from 'src/routes/BottomTab';
import { Route } from 'src/routes/const';
import { LogStack } from './stacks/LogStack';
import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={Route.BOTTOM_TAB} component={BottomTab} />
        <RootStack.Screen name={Route.LOG_STACK} component={LogStack} />
        {/* TODO error screen */}
        {/* <Stack.Screen name={} component={} />  */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
