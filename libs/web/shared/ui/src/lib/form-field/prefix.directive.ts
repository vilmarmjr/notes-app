import { computed, Directive, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const prefixVariants = cva('text-neutral-500 dark:text-neutral-400');

@Directive({
  selector: '[ntPrefix]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class PrefixDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() => ntMerge(prefixVariants(), this.userClass()));
}
