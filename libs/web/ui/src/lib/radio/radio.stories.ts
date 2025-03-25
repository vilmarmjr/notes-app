import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { IconComponent } from '../icon/icon.component';
import { RadioGroupComponent } from './radio-group.component';
import { RadioModule } from './radio.module';

const meta: Meta<RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'Radio',
  decorators: [
    moduleMetadata({
      imports: [RadioModule, IconComponent],
    }),
    componentWrapperDecorator(story => `<div class="max-w-96">${story}</div>`),
  ],
};

export default meta;

type Story = StoryObj<RadioGroupComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <nt-radio-group value="light">
        <nt-radio-button value="light">
          <nt-icon ntRadioButtonIcon name="sun" />
          <ng-container ntRadioButtonLabel>Light mode</ng-container>
          <ng-container ntRadioButtonDescription>Pick a clean and classic light theme</ng-container>
        </nt-radio-button>
        <nt-radio-button value="dark">
          <nt-icon ntRadioButtonIcon name="moon" />
          <ng-container ntRadioButtonLabel>Dark mode</ng-container>
          <ng-container ntRadioButtonDescription>Select a sleek and modern dark theme</ng-container>
        </nt-radio-button>
      </nt-radio-group>
    `,
  }),
};
