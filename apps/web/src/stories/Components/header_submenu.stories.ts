import type { Meta, StoryObj } from '@storybook/svelte';
import HeaderSubMenu from '$src/lib/view/header/header_submenu/header_submenu.svelte';
import { mockAdminUser } from '../mockData/user.model.js';
import { mobileParameters } from '../storybook.js';

const meta = {
	title: 'Escohotado/Components/Header/SubMenu',
	component: HeaderSubMenu,
	args: {
        user: mockAdminUser
    },
	parameters: {
		layout: 'fullscreen',
		design: {
			type: 'figspec',
			url: 'https://www.figma.com/design/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=441-7374&t=w8HFySdc4mVtGh0h-4'
		}
	}
} satisfies Meta<HeaderSubMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { parameters: {}};
export const Mobile: Story = { parameters: mobileParameters };