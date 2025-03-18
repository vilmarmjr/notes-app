import { computed, Directive, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

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
