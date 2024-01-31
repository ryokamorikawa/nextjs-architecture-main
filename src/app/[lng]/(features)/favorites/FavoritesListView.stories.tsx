import type { Meta, StoryObj } from '@storybook/react';
import sampleFavoritesOutputData from 'common/test/dummyData/sampleFavoritesOutputData';

import FavoritesListView from './FavoritesListView';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FavoritesListView> = {
  title: 'Firestore/FavoritesListView',
  component: FavoritesListView,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FavoritesListView>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DataPage: Story = {
  args: {
    lng: 'ja',
    streamUiFavorites: sampleFavoritesOutputData,
    errorMessage: undefined,
  },
};
export const NoDataPage: Story = {
  args: {
    lng: 'ja',
    streamUiFavorites: undefined,
    errorMessage: undefined,
  },
};
export const ErrorPage: Story = {
  args: {
    lng: 'ja',
    streamUiFavorites: undefined,
    errorMessage: 'データ取得に失敗しました。',
  },
};
