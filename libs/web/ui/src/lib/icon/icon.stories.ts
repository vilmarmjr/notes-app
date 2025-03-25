import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent, IconName, IconSize } from './icon.component';
import { icons } from './icons';

const sizeOptions: IconSize[] = [16, 20, 24, 28, 32, 36, 40, 44, 48, 56];

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Icon',
};

export default meta;

type Story = StoryObj<IconComponent>;

function buildStory(iconName: IconName): Story {
  return {
    args: {
      size: 24,
      name: iconName,
    },
    argTypes: {
      size: {
        options: sizeOptions,
        control: 'select',
        description: 'Size of the icon',
        table: {
          defaultValue: {
            summary: '20',
          },
        },
      },
      name: {
        options: Object.keys(icons),
        control: 'select',
        description: 'Name of the icon',
      },
    },
    render: args => ({
      props: args,
      template: `<nt-icon class="text-base-black dark:text-base-white" [name]="name" [size]="size" />`,
    }),
  };
}

export const Archive = buildStory('archive');
export const ArrowLeft = buildStory('arrowLeft');
export const Checkmark = buildStory('checkmark');
export const Crossmark = buildStory('crossmark');
export const ChevronRight = buildStory('chevronRight');
export const Clock = buildStory('clock');
export const Cross = buildStory('cross');
export const Delete = buildStory('delete');
export const FontMonospace = buildStory('fontMonospace');
export const FontSansSerif = buildStory('fontSansSerif');
export const FontSerif = buildStory('fontSerif');
export const Font = buildStory('font');
export const Google = buildStory('google');
export const HidePassword = buildStory('hidePassword');
export const Home = buildStory('home');
export const Info = buildStory('info');
export const Lock = buildStory('lock');
export const Logout = buildStory('logout');
export const Menu = buildStory('menu');
export const Moon = buildStory('moon');
export const Plus = buildStory('plus');
export const Restore = buildStory('restore');
export const Search = buildStory('search');
export const Settings = buildStory('settings');
export const ShowPassword = buildStory('showPassword');
export const Status = buildStory('status');
export const Sun = buildStory('sun');
export const SystemTheme = buildStory('systemTheme');
export const Tag = buildStory('tag');
