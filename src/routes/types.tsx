import type {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Route } from './const';

export type RootStackParamList = {
  [Route.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParamList>;
  [Route.LOG_STACK]: NavigatorScreenParams<LogStackParamList>;
};
export type BottomTabParamList = {
  [Route.HOME_STACK]: NavigatorScreenParams<HomeStackParamList>;
  empty: undefined; // TODO Remove ? @victor
  [Route.SETTINGS_STACK]: NavigatorScreenParams<SettingsStackParamList>;
};
export type HomeStackParamList = {
  // naming convention is that the enum string is the name ie Route.Home = 'homeTab'
  [Route.HOME]: undefined;
};
export type LogStackParamList = {
  [Route.LOG]: undefined;
};
export type SettingsStackParamList = {
  [Route.SETTINGS]: undefined;
  // for each screen under home you can add the route params
  [Route.TEST_SCREEN]: { id: string; optional?: string }; // TODO Remove
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type TabsScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type LogStackScreenProps<T extends keyof LogStackParamList> = CompositeScreenProps<
  StackScreenProps<LogStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type SettingsNavigationProps<T extends keyof SettingsStackParamList> =
  CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, T>,
    TabsNavigationProps<keyof BottomTabParamList>
  >;
export type TabsNavigationProps<T extends keyof BottomTabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, T>,
  RootNavigationProps<keyof RootStackParamList>
>;
export type RootNavigationProps<T extends keyof RootStackParamList> = StackNavigationProp<
  RootStackParamList,
  T
>;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
  StackScreenProps<SettingsStackParamList, T>,
  TabsScreenProps<keyof BottomTabParamList>
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, T>,
  TabsScreenProps<keyof BottomTabParamList>
>;

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
