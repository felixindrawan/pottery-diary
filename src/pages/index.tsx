import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PageHeader } from 'src/components/PageHeader';
import { getBGColor, useTheme } from 'src/hooks/useTheme';
import CreateLogPage from 'src/pages/CreateLogPage';
import HomePage from 'src/pages/HomePage';
import ProfilePage from 'src/pages/ProfilePage';
import { AppScreen, SCREEN_NAME } from 'src/utils/types/screens';
import { Icon } from 'src/components/Icon';

const Tab = createBottomTabNavigator();

export default function Pages() {
  const { currentTheme } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={AppScreen.HOME}>
        {SCREENS.map(({ name, component, icon }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              // Page Header Options
              headerTitle: () => <PageHeader title={SCREEN_NAME[name]} />,
              headerShadowVisible: false,
              headerStyle: style,
              // Bottom Tab Bar Options
              tabBarIcon: ({ focused }) => <Icon name={icon} focused={focused} />,
              tabBarAccessibilityLabel: SCREEN_NAME[name],
              tabBarShowLabel: false,
              tabBarStyle: style,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const SCREENS = [
  {
    name: AppScreen.HOME,
    component: HomePage,
    icon: 'home-filled',
  },
  {
    name: AppScreen.CREATE_LOG,
    component: CreateLogPage,
    icon: 'add-box',
  },
  {
    name: AppScreen.PROFILE,
    component: ProfilePage,
    icon: 'settings',
  },
];
