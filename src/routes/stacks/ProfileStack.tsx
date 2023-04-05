import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from 'src/pages/ProfilePage';
import { RouteConstants } from './../RouteConstants';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteConstants.profile}
    >
      <Stack.Screen name={RouteConstants.profile} component={ProfilePage} />
    </Stack.Navigator>
  );
}

export { ProfileStack};
