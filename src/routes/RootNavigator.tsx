import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {RouteConstants}  from './RouteConstants';

import {BottomTab} from './BottomTab';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Auth */}
      {/* <Stack.Screen name={} component={} options={{ headerShown: false }} /> */}
      {/* BottomTab */}
      <Stack.Screen name={RouteConstants.bottomTab} component={BottomTab} />
      {/* Log */}
      {/* <Stack.Screen name={RouteConstants.logStack} component={LogStack} /> */}
      {/* TODO error screen */}
      {/* <Stack.Screen name={} component={} />  */}
    </Stack.Navigator>
  );
};
export default RootNavigator;
