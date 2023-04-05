import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";
import { Icon } from 'src/components/Icon';

import { RouteConstants } from "./RouteConstants";
import { BottomTabParamList } from "./types";

export const BottomTabBarOptionByRouteName: Record<
  keyof BottomTabParamList,
  BottomTabNavigationOptions
> = {
  [RouteNames.homeStack]: {
    tabBarLabel: "Home",
    tabBarIcon: (props) => <Icon name="home-filled" {...props} />,
  },  
  [RouteNames.logStack]: {
    tabBarLabel: "Create Log",
    tabBarIcon: (props) => <Icon name="add-box" {...props} />,
  },
  [RouteNames.profileStack]: {
    tabBarLabel: "Profile",
    tabBarIcon: (props) => <Icon name="settings" {...props} />,
  },
};
