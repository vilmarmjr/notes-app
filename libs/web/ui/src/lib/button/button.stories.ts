import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonDirective } from './button.directive';

const meta: Meta<ButtonDirective> = {
  component: ButtonDirective,
  title: 'Button',
};

export default meta;

type Story = StoryObj<ButtonDirective>;

export const Primary: Story = {
  render: () => ({
    template: `
      <div class="flex gap-2">
        <button ntButton variant="primary">Enabled</button>
        <button ntButton variant="primary" [disabled]="true">Disabled</button>
      </div>
    `,
  }),
};

export const Border: Story = {
  render: () => ({
    template: `
      <div class="flex gap-2">
        <button ntButton variant="border">Enabled</button>
        <button ntButton variant="border" [disabled]="true">Disabled</button>
      </div>
    `,
  }),
};

export const Warn: Story = {
  render: () => ({
    template: `
      <div class="flex gap-2">
        <button ntButton variant="warn">Enabled</button>
        <button ntButton variant="warn" [disabled]="true">Disabled</button>
      </div>
    `,
  }),
};
