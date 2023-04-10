import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'src/components/Icon';
import View from 'src/components/View';
import { getBGColor, useTheme } from 'src/hooks/useTheme';
import { ROUTES_TITLE, Route } from 'src/routes/const';
import HomeStack from 'src/routes/stacks/HomeStack';
import SettingsStack from 'src/routes/stacks/SettingsStack';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTab() {
  const { currentTheme } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };

  return (
    <Tab.Navigator
      initialRouteName={Route.HOME_STACK}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { ...style, height: 54 },
        tabBarShowLabel: false,
        lazy: true,
      }}
    >
      <Tab.Screen
        name={Route.HOME_STACK}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home-filled" isActive={focused} />,
          tabBarAccessibilityLabel: ROUTES_TITLE[Route.HOME],
        }}
      />
      <Tab.Screen
        name="empty"
        component={View}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="add-box" isActive={focused} />,
          tabBarAccessibilityLabel: ROUTES_TITLE[Route.LOG],
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(Route.LOG_STACK);
          },
        })}
      />
      <Tab.Screen
        name={Route.SETTINGS_STACK}
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="settings" isActive={focused} />,
          tabBarAccessibilityLabel: ROUTES_TITLE[Route.SETTINGS],
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
