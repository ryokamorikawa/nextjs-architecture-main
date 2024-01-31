import type { Preview } from '@storybook/react';
import '../src/app/[lng]/globals.css';
import i18n from './i18next';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    i18n,
  },
  globals: {
    locale: 'ja',
    locales: {
      en: 'English',
      ja: '日本語',
    },
  },
};

export default preview;
