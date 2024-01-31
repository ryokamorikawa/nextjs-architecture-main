import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import WeatherScreen from './WeatherScreen';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof WeatherScreen> = {
  title: 'Weather/WeatherScreen',
  component: WeatherScreen,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WeatherScreen>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SampleData: Story = {
  args: {},
};

export const ValidationErrorHandlingTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    /// Tips:element確認したい時以下が使える。
    // const appTextElement = canvas.getAllByRole('textbox');
    // appTextElement.map((element) => {
    //   console.log(element);
    //   expect(element).toBeInTheDocument();
    // });

    const searchBarInput = canvas.getByRole('textbox', { name: 'search-bar' });

    await step('アルファベット以外の文字を入力した時にエラーダイアログを表示', async () => {
      userEvent.clear(searchBarInput);
      await userEvent.type(searchBarInput, 'とうきょう');
      await userEvent.click(canvas.getByRole('button'));

      expect(
        await canvas.findByText('都市名は大文字または小文字のアルファベットで入力してください。')
      ).toBeTruthy();
    });
  },
};
