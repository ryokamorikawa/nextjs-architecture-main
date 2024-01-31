import type { Meta, StoryObj } from '@storybook/react';
import { CurrentWeatherOutputData } from 'entities/weather/CurrentWeatherOutputData';

import WeatherScreenView from './WeatherScreenView';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof WeatherScreenView> = {
  title: 'Weather/WeatherScreenView',
  component: WeatherScreenView,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WeatherScreenView>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SampleData: Story = {
  args: {
    lng: 'ja',
    city: '',
    weather: new CurrentWeatherOutputData('', '', '', '', '', 0, ''),
    loading: false,
    onChangeCity: () => console.log('onChangeCity triggered'),
    onSearchWeather: () => console.log('onSearchWeather clicked'),
    errorMessage: '',
  },
};
