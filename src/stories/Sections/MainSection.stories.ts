import type { Meta, StoryObj } from '@storybook/svelte';
import MainSection from 'lib/main-section/MainSection.svelte';

const meta = {
  title: 'Escohotado/Section/Main Section',
  component: MainSection,
  tags: ['autodocs'],
} satisfies Meta<MainSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/CQS7dIcNELi5HMFoEoNcsX/Nexo-Labs?node-id=83-4246&t=6S2t4TA9HCLBkeoP-4",
    },
  },
};

