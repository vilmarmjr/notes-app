import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  component: DividerComponent,
  title: 'Divider',
};

export default meta;

type Story = StoryObj<DividerComponent>;

export const Horizontal: Story = {
  render: () => ({
    template: `
      <nt-divider class="w-56" direction="horizontal" />
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <nt-divider class="h-56" direction="vertical" />
    `,
  }),
};
