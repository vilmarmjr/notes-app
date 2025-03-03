import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const progressVariants = cva(
  'block h-1 w-full overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-700',
);

@Component({
  selector: 'nt-progress',
  imports: [CommonModule],
  host: {
    '[class]': 'computedClass()',
    role: 'progressbar',
    'aria-busy': 'true',
  },
  template: `
    <div
      class="animate-indeterminateProgress h-full w-full origin-[0%_50%] bg-blue-500"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  public userClass = input('', { alias: 'class' });
  protected computedClass = computed(() => ntMerge(progressVariants(), this.userClass()));
}
