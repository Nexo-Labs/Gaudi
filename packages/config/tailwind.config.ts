/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss"

const config: Omit<Config, "content"> = {
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
	plugins: [require('@tailwindcss/typography')]
};

export default config