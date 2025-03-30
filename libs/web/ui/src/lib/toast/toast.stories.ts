import { Component, inject, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ButtonDirective } from '../button/button.directive';
import { ToastService } from './toast.service';

@Component({
  selector: 'nt-demo-component',
  imports: [ButtonDirective],
  template: `
    <button ntButton (click)="open()">Open toast</button>
  `,
})
class DemoComponent {
  public type = input.required<'success' | 'error'>();
  public text = input.required<string>();
  public width = input.required<number>();
  public timeout = input.required<number>();
  public extendedTimeout = input.required<number>();
  protected toastService = inject(ToastService);

  protected open() {
    const config = {
      width: this.width(),
      timeout: this.timeout(),
      extendedTimeout: this.extendedTimeout(),
    };
    if (this.type() === 'success') {
      this.toastService.success(this.text(), config);
    }
    if (this.type() === 'error') {
      this.toastService.error(this.text(), config);
    }
  }
}

const meta: Meta = {
  component: DemoComponent,
  title: 'Toast',
  decorators: [applicationConfig({ providers: [provideAnimations()] })],
  args: {
    width: 300,
    timeout: 4000,
    extendedTimeout: 2000,
  },
  argTypes: {
    type: {
      table: { disable: true },
    },
  },
  render: args => {
    return {
      props: args,
      template: `
        <nt-demo-component ${argsToTemplate(args)} />
      `,
    };
  },
};

export default meta;

type Story = StoryObj;

export const Success: Story = {
  args: {
    text: 'Success message',
    type: 'success',
  },
};

export const Error: Story = {
  args: {
    text: 'Error message',
    type: 'error',
  },
};
