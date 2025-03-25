import { withThemeByClassName } from '@storybook/addon-themes';
import type { AngularRenderer, Preview } from '@storybook/angular';

const preview: Preview = {
  decorators: [
    withThemeByClassName<AngularRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
