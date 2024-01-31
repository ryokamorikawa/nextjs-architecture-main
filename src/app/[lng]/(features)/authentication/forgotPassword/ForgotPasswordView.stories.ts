import type { Meta, StoryObj } from '@storybook/react';

import ForgotPasswordView from './ForgotPasswordView';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ForgotPasswordView> = {
  title: 'authentication/ForgotPasswordView',
  component: ForgotPasswordView,
  tags: ['autodocs'],
  argTypes: {
    state: {
      options: ['before', 'processing', 'error', 'done'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordView>;

export const DefaultPage: Story = {
  args: {
    lng: 'ja',
    state: 'before',
    onReset: () => console.log('reset clicked'),
    errorMessage: undefined,
  },
};
export const ErrorPage: Story = {
  args: {
    lng: 'ja',
    state: 'error',
    onReset: () => console.log('reset clicked'),
    errorMessage: 'メールアドレスが正しくありません',
  },
};
export const ForgotPasswordEmailSent: Story = {
  args: {
    lng: 'ja',
    state: 'done',
    onReset: () => console.log('reset clicked'),
    errorMessage: undefined,
  },
};
