import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import { RouteConstants } from './RouteConstants';
import { HomeStack } from '../stacks/HomeStack';
import { ProfileStack } from '../stacks/ProfileStack';
import { Log }
import SearchAndFilter from 'src/pages/HomePage/SearchAndFilter';


const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTab() {
  const { currentTheme } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };

  return (
    <Tab.Navigator initialRouteName={RouteConstants.homeStack}>
      <Tab.screen
        name={RouteConstants.homeStack}
        component={HomeStack}
        options={{
          lazy: true,
          // Page Header Options
          headerTitle: () => <HeaderTitle title={'Home'} />,
          headerRight: SearchAndFilter,
          headerShadowVisible: false,
          headerStyle: style,
          // Bottom Tab Bar Options
          tabBarIcon: ({ focused }) => <Icon name={'home-filled'} isActive={focused} />,
          tabBarAccessibilityLabel: 'Home',
          tabBarShowLabel: false,
          tabBarStyle: { ...style, height: 54 },
        }}
      />
      <Tab.screen
        name={RouteConstants.logStack}
        component={LogStack}
        options={{
          lazy: true,
          // Page Header Options
          headerTitle: () => <HeaderTitle title={'Create Log'} />,
          headerShadowVisible: false,
          headerStyle: style,
          // Bottom Tab Bar Options
          tabBarIcon: ({ focused }) => <Icon name={'add-box'} isActive={focused} />,
          tabBarAccessibilityLabel: 'Create Log',
          tabBarShowLabel: false,
          tabBarStyle: { ...style, height: 54 },
          // Show as Modal
        }}
      />
      <Tab.screen
        name={RouteConstants.profileStack}
        component={ProfileStack}
        options={{
          lazy: true,
          // Page Header Options
          headerTitle: () => <HeaderTitle title={'Profile'} />,
          headerShadowVisible: false,
          headerStyle: style,
          // Bottom Tab Bar Options
          tabBarIcon: ({ focused }) => <Icon name={'settings'} isActive={focused} />,
          tabBarAccessibilityLabel: 'Profile',
          tabBarShowLabel: false,
          tabBarStyle: { ...style, height: 54 },
          // Show as Modal
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
