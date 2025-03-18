import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const dialogFooterClass = cva(
  'flex justify-end gap-4 border-t border-neutral-200 px-5 py-4 dark:border-neutral-600',
);

@Component({
  selector: 'nt-dialog-footer',
  imports: [CommonModule],
  host: {
    '[class]': 'computedClass()',
  },
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFooterComponent {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() =>
    ntMerge(dialogFooterClass(), this.userClass()),
  );
}
