import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const skeletonItemClass = cva(
  'h-4 w-full animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800',
);

@Component({
  selector: 'nt-skeleton-item',
  imports: [CommonModule],
  template: '',
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonItemComponent {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() =>
    ntMerge(skeletonItemClass(), this.userClass()),
  );
}
