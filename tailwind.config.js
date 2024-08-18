/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens: {

      },
      colors: {
        'generic-bg-light': '#F7F2EF',
        'generic-bg-dark': '#222222',
        'logo-color': '#0E2F41',
        'text-primary': '#333333',
      },
      fontFamily: {
        'escohotado': ['Escohotado', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

