/** @type {import('tailwindcss').Config} */

import flowbitePlugin from 'flowbite/plugin'
import type { Config } from 'tailwindcss';
import sharedConfig from "config"
const path = require('path');

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}', 
		internalLibrary('gaudi'),
		nodemodulesLibrary('flowbite-svelte')
	],
	...sharedConfig,
	plugins: [flowbitePlugin, ...sharedConfig.plugins]
} as Config;

function internalLibrary(library: string): string {
	return path.join(path.dirname(require.resolve(library)), '**/*.{html,js,svelte,ts}');
}

function nodemodulesLibrary(library: string): string {
	return './node_modules/' + library + '/**/*.{html,js,svelte,ts}';
}