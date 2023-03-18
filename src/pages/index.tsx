import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderTitle } from 'src/components/PageHeader';
import { getBGColor, useTheme } from 'src/hooks/useTheme';
import CreateLogPage from 'src/pages/CreateLogPage';
import HomePage from 'src/pages/HomePage';
import ProfilePage from 'src/pages/ProfilePage';
import { AppScreen, ScreenProps, SCREEN_NAME } from 'src/utils/types/screens';
import { Icon } from 'src/components/Icon';
import SearchAndFilter from 'src/pages/HomePage/SearchAndFilter';

const Tab = createBottomTabNavigator();

export default function Pages() {
  const { currentTheme } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={AppScreen.HOME}>
        {SCREENS.map(({ name, subtitle, component, icon, extra }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component as any} //TODO: Fix type
            options={{
              // Page Header Options
              headerTitle: () => (
                <HeaderTitle title={SCREEN_NAME[name] ?? name} subtitle={subtitle} />
              ),
              headerRight: extra,
              headerShadowVisible: false,
              headerStyle: style,
              // Bottom Tab Bar Options
              tabBarIcon: ({ focused }) => <Icon name={icon} isActive={focused} />,
              tabBarAccessibilityLabel: SCREEN_NAME[name],
              tabBarShowLabel: false,
              tabBarStyle: { ...style, height: 54 },
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const SCREENS: ScreenProps[] = [
  {
    name: AppScreen.HOME,
    component: HomePage,
    icon: 'home-filled',
    extra: () => <SearchAndFilter />,
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
