import {sequence} from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import { handle as authHandler } from "$src/lib/server/auth.service.js";

Sentry.init({
    dsn: "https://827f4d7bb1466e4f7c9dabdba9a427f4@o1127559.ingest.us.sentry.io/4507916849512448",
    tracesSampleRate: 1,
    environment: process.env.NODE_ENV || 'development',
    beforeSend(event) {
        event.tags = { ...event.tags, source: 'backend' };
        return event;
    }
})

export const handle = sequence(
    Sentry.sentryHandle(), 
    authHandler
);
export const handleError = Sentry.handleErrorWithSentry();
