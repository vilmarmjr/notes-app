import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressComponent } from './progress.component';

const meta: Meta<ProgressComponent> = {
  component: ProgressComponent,
  title: 'Progress',
};

export default meta;

type Story = StoryObj<ProgressComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <nt-progress />
    `,
  }),
};
