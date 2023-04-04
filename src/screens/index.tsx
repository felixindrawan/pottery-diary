import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'src/components/Icon';
import { getBGColor, useTheme } from 'src/hooks/useTheme';
import { Route, ROUTES_TITLE } from 'src/routes/const';
import LogScreen from 'src/screens/LogScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

const RootStack = createStackNavigator();
export default function Screens() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="bottomStack" component={BottomTabNavigation} />
        <RootStack.Screen
          name={Route.LOG}
          component={LogScreen}
          options={{
            presentation: 'modal',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator();
export function BottomTabNavigation() {
  const { currentTheme } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };
  return (
    <BottomTab.Navigator
      initialRouteName={Route.HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { ...style, height: 54 },
        tabBarShowLabel: false,
        lazy: true,
      }}
    >
      <BottomTab.Screen
        name={Route.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home-filled" isActive={focused} />,
          tabBarAccessibilityLabel: ROUTES_TITLE[Route.HOME],
        }}
      />
      <BottomTab.Screen
        name={Route.LOG}
        component={LogScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(Route.LOG);
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="add-box" isActive={focused} />,
          tabBarAccessibilityLabel: ROUTES_TITLE[Route.LOG],
        }}
      />
      <BottomTab.Screen
        name={Route.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="settings" isActive={focused} />,
          tabBarAccessibilityLabel: ROUTES_TITLE[Route.SETTINGS],
        }}
      />
    </BottomTab.Navigator>
  );
}
