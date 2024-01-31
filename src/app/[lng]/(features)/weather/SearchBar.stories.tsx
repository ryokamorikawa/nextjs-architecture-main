import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './SearchBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SearchBar> = {
  title: 'Weather/SearchBar',
  component: SearchBar,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    lng: 'ja',
    target: 'Japan',
    onChangeTarget: () => console.log('onChangeTarget clicked'),
    onClick: () => console.log('onClick clicked'),
  },
};
