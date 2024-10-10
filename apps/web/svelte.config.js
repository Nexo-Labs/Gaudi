import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			lib: 'src/lib',
			$src: 'src',
			$routes: 'src/routes',
			$components: 'src/lib',
			'lib/*': 'src/lib/*',
			$houdini: './$houdini',
		}
	}
};

export default config;