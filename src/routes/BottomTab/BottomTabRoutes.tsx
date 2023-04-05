import {
    BottomTabNavigationEventMap,
    BottomTabNavigationOptions,
  } from "@react-navigation/bottom-tabs";
  import { RouteConfig, StackNavigationState } from "@react-navigation/native";
  import { BottomTabBarOptionByRouteName } from "~navigation/helpers/tabbar-options";
  import { RouteConstants } from "./RouteConstants";
  import HomeStack from "../stacks/home";
  import ProfileStack from "../stacks/profile";
  import { BottomTabParamList } from "../types";
  
  export const BottomTabRoutes: Array<
    RouteConfig<
      BottomTabParamList,
      keyof BottomTabParamList,
      StackNavigationState<BottomTabParamList>,
      BottomTabNavigationOptions,
      BottomTabNavigationEventMap
    >
  > = [
    {
      options: BottomTabBarOptionByRouteName[RouteConstants.homeStack],
      name: RouteConstants.homeStack,
      component: HomeStack,
    },
    {
      options: BottomTabBarOptionByRouteName[RouteConstants.profileStack],
      name: RouteConstants.profileStack,
      component: ProfileStack,
    },
  ];
  