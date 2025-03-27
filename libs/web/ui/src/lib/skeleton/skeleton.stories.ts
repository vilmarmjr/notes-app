import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SkeletonComponent } from './skeleton.component';
import { SkeletonModule } from './skeleton.module';

const meta: Meta<SkeletonComponent> = {
  component: SkeletonComponent,
  title: 'Skeleton',
  decorators: [
    moduleMetadata({
      imports: [SkeletonModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SkeletonComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <nt-skeleton class="flex flex-col gap-5">
        <nt-skeleton-item class="mt-6 h-4 w-2/3 md:w-1/4" />
        <nt-skeleton-item class="h-4 w-28" />
        <nt-skeleton-item class="h-4 w-2/3 md:w-1/4" />
        <nt-skeleton-item class="h-4 w-1/3" />
        <nt-skeleton-item class="h-4 w-28" />
        <nt-skeleton-item class="h-4 w-2/3 md:w-1/4" />
        <nt-skeleton-item class="h-4 w-1/3" />
      </nt-skeleton>
    `,
  }),
};
