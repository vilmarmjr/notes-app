import { computed, Directive, input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';

const dialogTextClass = cva('text-preset-5 text-neutral-700 dark:text-neutral-200');

@Directive({
  selector: '[ntDialogText]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class DialogTextDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() => ntMerge(dialogTextClass(), this.userClass()));
}
