import { computed, Directive, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

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
