import type { Meta, StoryObj } from '@storybook/svelte';
import NavButton from '$lib/view/common/NavButton.svelte';

const meta = {
	title: 'Escohotado/Atoms/NavButton',
	component: NavButton,
	tags: ['autodocs']
} satisfies Meta<NavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		text: 'Descubre al maestro',
		variant: 'primary'
	}
};

export const Secondary: Story = {
	args: {
		text: 'Descubre al maestro',
		variant: 'secondary'
	}
};
