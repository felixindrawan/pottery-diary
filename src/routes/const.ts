export enum Route {
  HOME = 'homeTab',
  SETTINGS = 'settingsTab',
  LOG = 'logTab',
}

export const ROUTES_TITLE: Record<Route, string> = {
  // Bottom Tabs Navigation
  [Route.HOME]: 'Home',
  [Route.SETTINGS]: 'Settings',
  [Route.LOG]: 'Create Log',
};
