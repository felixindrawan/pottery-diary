enum Route {
  // Bottom Tab
  BOTTOM_TAB = 'bottomTab',

  // Stack
  HOME_STACK = 'homeStack',
  SETTINGS_STACK = 'settingsStack',
  LOG_STACK = 'logStack',

  // Home
  HOME = 'homeTab',

  // Log
  LOG = 'logTab',

  // Settings
  SETTINGS = 'settingsTab',
  TEST_SCREEN = 'testScreen',

  // Future
  LAUNCH = 'launch',
  LOGIN = 'login',
  SIGNUP = 'signup',
}

const ROUTES_TITLE: Record<Route, string> = {
  // Bottom Tab
  [Route.BOTTOM_TAB]: 'Bottom Tab',
  [Route.HOME]: 'Home',
  [Route.LOG]: 'Create Log',

  // Stack
  [Route.HOME_STACK]: 'Home Stack',
  [Route.SETTINGS_STACK]: 'Settings Stack',
  [Route.LOG_STACK]: 'Log Stack',

  // Log

  // Settings
  [Route.SETTINGS]: 'Settings',
  [Route.TEST_SCREEN]: 'Test Screen',


  // Future
  [Route.LAUNCH]: 'Launch',
  [Route.LOGIN]: 'Login',
  [Route.SIGNUP]: 'Sign Up',
};

export { Route, ROUTES_TITLE };
