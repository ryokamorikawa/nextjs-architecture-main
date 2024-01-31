// import FormButton from './ButtonKimura';
// import  { StoryObj } from '@storybook/react';

// export default {
//   title: 'Example/ButtonKimura',
//   component: FormButton,
// };

import type { Meta, StoryObj } from '@storybook/react';

import { FormButton } from './FormButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FormButton> = {
  title: 'Components/FormButton',
  component: FormButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FormButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
