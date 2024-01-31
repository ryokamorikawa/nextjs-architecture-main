import type { Meta, StoryObj } from '@storybook/react';
import dubaiWeatherOutputData from 'common/test/dummyData/dubaiWeatherOutputData.json';

import WeatherDetailsView from './WeatherDetailsView';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof WeatherDetailsView> = {
  title: 'Weather/WeatherDetailsView',
  component: WeatherDetailsView,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WeatherDetailsView>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SampleData: Story = {
  args: {
    data: dubaiWeatherOutputData,
  },
};
