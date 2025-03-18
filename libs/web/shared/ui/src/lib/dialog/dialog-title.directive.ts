import { computed, Directive, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const dialogTitleClass = cva('text-preset-3 dark:text-base-white text-neutral-950');

@Directive({
  selector: '[ntDialogTitle]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class DialogTitleDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() => ntMerge(dialogTitleClass(), this.userClass()));
}
