import type { Meta, StoryObj } from '@storybook/svelte';
import Header from '$src/lib/view/header/header.svelte';
import { mockUser } from '../mockData/user.model.js';
import { mobileParameters } from '../storybook.js';

const meta = {
	title: 'Escohotado/Components/Header',
	component: Header,
	args: {
		user: mockUser
	},
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/file/CQS7dIcNELi5HMFoEoNcsX/Nexo-Labs?node-id=83-4246&t=6S2t4TA9HCLBkeoP-4'
		}
	}
} satisfies Meta<Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { parameters: {}};
export const Mobile: Story = { parameters: mobileParameters };