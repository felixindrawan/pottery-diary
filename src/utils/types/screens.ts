import { ReactNode } from 'react';

export enum AppScreen {
  HOME = 'home',
  PROFILE = 'profile',
  CREATE_LOG = 'createLog',
}

export const SCREEN_NAME: Record<AppScreen, string> = {
  [AppScreen.HOME]: 'Home',
  [AppScreen.PROFILE]: 'Profile',
  [AppScreen.CREATE_LOG]: 'Create Log',
};

export type ScreenProps = {
  name?: AppScreen;
  subtitle?: ReactNode;
  component?: () => ReactNode;
  icon?: string;
  extra?: () => ReactNode;
};
