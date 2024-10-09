/** @type {import('tailwindcss').Config} */

import flowbitePlugin from 'flowbite/plugin'
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {},
			colors: {
				'generic-main': '#D9D9D2',
				'generic-secondary': '#B6B7A3',
				'generic-bg-dark': '#222222',
				'title-primary': '#0E2F41',
				'menu-section-title': '#939393',
				'text-primary': '#333333'
			},
			fontFamily: {
				escohotado: ['Escohotado', 'serif'],
				yesevaone: ['YesevaOne', 'serif'],
				montserrat: ['Montserrat', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), flowbitePlugin]
} as Config;
