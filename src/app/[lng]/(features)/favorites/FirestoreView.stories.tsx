import type { Meta, StoryObj } from '@storybook/react';
import sampleFavoritesOutputData from 'common/test/dummyData/sampleFavoritesOutputData';

import FirestoreView from './FirestoreView';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FirestoreView> = {
  title: 'Firestore/FirestoreView',
  component: FirestoreView,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FirestoreView>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FirestoreViewPage: Story = {
  args: {
    lng: 'ja',
    documentId: 'created document id xxxxxx',
    onClickAdd: () => console.log('onclicked clicked'),
    streamUiFavorites: sampleFavoritesOutputData,
    errorText: undefined,
    errorMessage: undefined,
  },
};
