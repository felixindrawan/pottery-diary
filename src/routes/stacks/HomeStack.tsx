import { createStackNavigator } from '@react-navigation/stack';
import { Route } from 'src/routes/const';
import HomeScreen from 'src/screens/HomeScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}

      initialRouteName={Route.HOME}
    >
      <Stack.Screen name={Route.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export { HomeStack };
