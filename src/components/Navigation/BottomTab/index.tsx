import { ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateLogPage from 'src/pages/CreateLogPage';
import HomePage from 'src/pages/HomePage';
import ProfilePage from 'src/pages/ProfilePage';
import { Icon } from 'src/components/Icon';
import SearchAndFilter from 'src/pages/HomePage/SearchAndFilter';
import { HeaderTitle } from 'src/components/PageHeader';
import { getBGColor, useTheme } from 'src/hooks/useTheme';
import { Stack } from '../Stack';

enum Tab {
  HOME = 'homeTab',
  PROFILE = 'profileTab',
  CREATE_LOG = 'createLogTab',
}

const TABS_TITLE: Record<Tab, string> = {
  [Tab.HOME]: 'Home',
  [Tab.PROFILE]: 'Profile',
  [Tab.CREATE_LOG]: 'Create Log',
};

const BottomTabStack = createBottomTabNavigator();
export default function BottomTabNavigation() {
  const { currentTheme } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };
  return (
    <BottomTabStack.Navigator initialRouteName={Tab.HOME}>
      {TABS.map(({ name, component, icon, extra, modal }) => (
        <BottomTabStack.Screen
          key={name}
          name={name}
          component={component as any} //TODO: Fix type
          options={{
            // Page Header Options
            headerTitle: () => <HeaderTitle title={TABS_TITLE[name] ?? name} />,
            headerRight: extra,
            headerShadowVisible: false,
            headerStyle: style,
            // Bottom Tab Bar Options
            tabBarIcon: ({ focused }) => <Icon name={icon} isActive={focused} />,
            tabBarAccessibilityLabel: TABS_TITLE[name],
            tabBarShowLabel: false,
            tabBarStyle: { ...style, height: 54 },
            // Show as Modal
          }}
          listeners={modal}
        />
      ))}
    </BottomTabStack.Navigator>
  );
}

type TabProps = {
  name?: Tab;
  component?: () => ReactNode;
  icon?: string;
  extra?: () => ReactNode;
  modal?: any; // TODO: Fix type
};

const TABS: TabProps[] = [
  {
    name: Tab.HOME,
    component: HomePage,
    icon: 'home-filled',
    extra: SearchAndFilter,
  },
  {
    name: Tab.CREATE_LOG,
    component: CreateLogPage,
    icon: 'add-box',
    modal: ({ navigation }) => ({
      tabPress: (e) => {
        e.preventDefault();
        navigation.navigate(Stack.CREATE_LOG);
      },
    }),
  },
  {
    name: Tab.PROFILE,
    component: ProfilePage,
    icon: 'settings',
  },
];
