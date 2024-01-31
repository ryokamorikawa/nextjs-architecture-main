import type { Meta, StoryObj } from '@storybook/react';
import InputWithIcon from 'components/InputWithIcon/InputWithIcon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InputWithIcon> = {
  title: 'components/InputWithIcon',
  component: InputWithIcon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputWithIcon>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Email: Story = {
  args: {
    id: 'email',
    type: 'email',
    required: true,
    disabled: true,
    placeholder: 'Email',
    ariaLabel: 'email',
    svgPath:
      'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z',
  },
};
