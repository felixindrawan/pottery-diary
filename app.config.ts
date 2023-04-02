import { ExpoConfig, ConfigContext } from 'expo/config';

let environment = {};

if (process.env.APP_ENV === 'prod') {
  // environment.something = 'something';
} else if (process.env.APP_ENV === 'stage') {
} else if (process.env.APP_ENV === 'dev') {
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    ...environment,
    eas: {
      projectId: '820b16f0-09d8-4e3f-a616-9091f304831b',
    },
  },
});
