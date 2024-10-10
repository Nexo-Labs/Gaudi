import type { Preview } from '@storybook/svelte';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import "../src/styles.css";

const preview: Preview = {
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset'
		},  
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
