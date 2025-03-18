import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const dialogIconClass = cva(
  'dark:text-base-white flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-950 dark:bg-neutral-600',
);

@Component({
  selector: 'nt-dialog-icon',
  imports: [CommonModule],
  host: {
    '[class]': 'computedClass()',
  },
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogIconComponent {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() => ntMerge(dialogIconClass(), this.userClass()));
}
