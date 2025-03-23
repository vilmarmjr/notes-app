import { computed, Directive, input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';

const suffixVariants = cva('text-neutral-500');

@Directive({
  selector: '[ntSuffix]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SuffixDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() => ntMerge(suffixVariants(), this.userClass()));
}
