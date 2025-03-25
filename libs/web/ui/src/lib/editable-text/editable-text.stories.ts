import type { Meta, StoryObj } from '@storybook/angular';
import { EditableTextDirective } from './editable-text.directive';

const meta: Meta<EditableTextDirective> = {
  component: EditableTextDirective,
  title: 'Editable Text',
};

export default meta;

type Story = StoryObj<EditableTextDirective>;

export const Default: Story = {
  render: () => ({
    template: `
      <h1 ntEditableText class="text-preset-1">Enter a title...</h1>
    `,
  }),
};
