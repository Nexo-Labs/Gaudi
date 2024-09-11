import type { Meta, StoryObj } from '@storybook/svelte';
import MainPage from 'lib/../routes/+page.svelte';
import Layout from 'lib/../routes/+layout.svelte';

const meta = {
	title: 'Escohotado/Pages/Home',
	component: MainPage,
	decorators: [
		(story) => ({
			Component: Layout,
			slot: story()
		})
	],

	tags: ['autodocs']
} satisfies Meta<MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/CQS7dIcNELi5HMFoEoNcsX/Nexo-Labs?node-id=83-4246&t=6S2t4TA9HCLBkeoP-4'
		}
	}
};
