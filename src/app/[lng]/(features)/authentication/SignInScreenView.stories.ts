import type { Meta, StoryObj } from '@storybook/react';

import SignInScreenView from './SignInScreenView';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SignInScreenView> = {
  title: 'authentication/SignInScreenView',
  component: SignInScreenView,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignInScreenView>;

export const DefaultPage: Story = {
  args: {
    lng: 'ja',
    loading: false,
    signIn: () => console.log('signIn Clicked'),
    errorMessage: undefined,
  },
};
