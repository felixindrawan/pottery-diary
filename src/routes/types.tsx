import type {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  bottomTab: NavigatorScreenParams<BottomTabParamList>;
  logStack: NavigatorScreenParams<LogStackParamList>;
};
export type BottomTabParamList = {
  homeStack: NavigatorScreenParams<HomeStackParamList>;
  empty: undefined;
  settingsStack: NavigatorScreenParams<SettingsStackParamList>;
};
export type HomeStackParamList = {
  // naming convention is that the enum string is the name ie Route.Home = 'homeTab'
  homeTab: undefined;
};
export type LogStackParamList = {
  logTab: undefined;
};
export type SettingsStackParamList = {
  settingsTab: undefined;
  // for each screen under home you can add the route params
  testScreen: { id: string; optional?: string };
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
    interface RootParamList extends RootStackParamList {}
  }
}
