import { ThemeProvider } from 'src/hooks/useTheme';
import Pages from 'src/pages';
import * as Sentry from 'sentry-expo';
//import { APP_ENV, SENTRY_DSN } from '@env';

// Error Handling by Sentry
Sentry.init({
  //dsn: SENTRY_DSN,
  // TODO: Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: true,
  //debug: APP_ENV === 'dev',
});

function App() {
  try {
    return (
      <ThemeProvider>
        <Pages />
      </ThemeProvider>
    );
  } catch (error) {
    Sentry.Native.captureException(error);
  }
}

export default Sentry.Native.wrap(App);
