import * as Sentry from '@sentry/sveltekit';

// If you don't want to use Session Replay, remove the `Replay` integration,
// `replaysSessionSampleRate` and `replaysOnErrorSampleRate` options.
Sentry.init({
	dsn: 'https://eb84a43f4e38d0039883b4465367f3c9@o1127559.ingest.us.sentry.io/4507935929139200',
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [Sentry.replayIntegration()],
  environment: import.meta.env.MODE
});

export const handleError = Sentry.handleErrorWithSentry();
