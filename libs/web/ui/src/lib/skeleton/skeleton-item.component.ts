import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';

const skeletonItemVariants = cva(
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
    ntMerge(skeletonItemVariants(), this.userClass()),
  );
}
