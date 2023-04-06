import * as Sentry from 'sentry-expo';
import { StatusBar } from 'expo-status-bar';
import { APP_ENV, SENTRY_DSN } from '@env';
import { Fragment } from 'react';
import RootNavigator from 'src/routes/RootNavigator';
import { ThemeProvider } from 'src/hooks/useTheme';

// Error Handling by Sentry
Sentry.init({
  dsn: SENTRY_DSN,
  // TODO: Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: true,
  debug: APP_ENV === 'dev',
});

const App = () => {
  try {
    return (
      <ThemeProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </ThemeProvider>
    );
  } catch (error) {
    Sentry.Native.captureException(error);
    return <></>;
  }
};

export default Sentry.Native.wrap(App);
