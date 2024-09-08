import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "nexo-labs",
            project: "escohotado",
            url: "https://sentry.io/"
        }
    }), sveltekit()],
	server: {
		host: true,
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
});