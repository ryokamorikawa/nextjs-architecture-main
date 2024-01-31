---
to: <%= storyFilePath %>
skip_if: "<%= componentName  === `` %>"
unless_exists: true
---
import type { Meta, StoryObj } from '@storybook/react';

import <%= componentName %> from './<%= componentName %>';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof <%= componentName %>> = {
  title: '<%= storyBookTitlePath %>',
  component: <%= componentName %>,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof <%= componentName %>>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sample: Story = {
  args: {},
};
