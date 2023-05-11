import * as Sentry from 'sentry-expo';
import { StatusBar } from 'expo-status-bar';
import { APP_ENV, SENTRY_DSN } from '@env';
import RootNavigator from 'src/routes/RootNavigator';
import { ThemeProvider } from 'src/hooks/useTheme';
import { WithRealm } from './hooks/useRealm';

// Error Handling by Sentry
Sentry.init({
  dsn: SENTRY_DSN,
  // TODO: Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  // tracesSampleRate: 1.0,
  enableInExpoDevelopment: true,
  debug: APP_ENV === 'dev',
});

function App() {
  return (
    <ThemeProvider>
      <WithRealm>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="auto" />
        <RootNavigator />
      </WithRealm>
    </ThemeProvider>
  );
}

export default App;
