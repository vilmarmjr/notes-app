import { computed, Directive, input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';

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
