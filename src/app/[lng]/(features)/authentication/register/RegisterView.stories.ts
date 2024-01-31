import type { Meta, StoryObj } from '@storybook/react';

import RegisterView from './RegisterView';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RegisterView> = {
  title: 'authentication/RegisterView',
  component: RegisterView,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RegisterView>;

export const RegisterPage: Story = {
  args: {
    lng: 'ja',
    loading: false,
    onRegister: () => console.log('onRegister clicked'),
    errorMessage: undefined,
  },
};
export const ErrorPage: Story = {
  args: {
    lng: 'ja',
    loading: false,
    onRegister: () => console.log('onRegister clicked'),
    errorMessage: 'エラーが発生しました',
  },
};
