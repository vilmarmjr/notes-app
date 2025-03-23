import { computed, Directive, input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';

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
