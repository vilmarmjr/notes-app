import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ButtonDirective } from '../button/button.directive';
import { IconComponent, IconName } from '../icon/icon.component';
import { icons } from '../icon/icons';
import { DialogModule } from './dialog.module';

@Component({
  selector: 'nt-demo-component',
  imports: [CommonModule, ButtonDirective, IconComponent, DialogModule],
  template: `
    <button ntButton (click)="isOpen.set(true)">Open dialog</button>
    <ng-template
      [width]="width()"
      [height]="height()"
      [maxWidth]="maxWidth()"
      [maxHeight]="maxHeight()"
      [(ntShowDialog)]="isOpen"
    >
      <div class="flex w-full flex-col">
        <div class="flex gap-4 p-5">
          @if (icon(); as icon) {
            <nt-dialog-icon>
              <nt-icon [name]="icon" />
            </nt-dialog-icon>
          }
          <div class="flex flex-col gap-1">
            <h2 ntDialogTitle>This is the title</h2>
            <p ntDialogText>This is the content</p>
          </div>
        </div>
        <nt-dialog-footer>
          <button ntButton ntDialogClose variant="border" type="button">Close</button>
        </nt-dialog-footer>
      </div>
    </ng-template>
  `,
})
class DemoComponent {
  public width = input<number>();
  public height = input<number>();
  public minWidth = input<number>();
  public minHeight = input<number>();
  public maxWidth = input<number>();
  public maxHeight = input<number>();
  public icon = input<IconName>();
  protected isOpen = signal(false);
}

const meta: Meta = {
  component: DemoComponent,
  title: 'Dialog',
  decorators: [applicationConfig({ providers: [provideAnimations()] })],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    width: 300,
    minWidth: undefined,
    maxWidth: undefined,
    height: undefined,
    minHeight: undefined,
    maxHeight: undefined,
    icon: undefined,
  },
  argTypes: {
    width: { type: 'number' },
    minWidth: { type: 'number' },
    maxWidth: { type: 'number' },
    height: { type: 'number' },
    minHeight: { type: 'number' },
    maxHeight: { type: 'number' },
    icon: {
      control: 'select',
      options: Object.keys(icons),
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
