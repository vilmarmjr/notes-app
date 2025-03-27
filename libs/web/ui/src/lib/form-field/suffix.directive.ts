import { computed, Directive, input, signal } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';

const suffixVariants = cva('shrink-0', {
  variants: {
    disabled: {
      true: 'text-neutral-300',
      false: 'text-neutral-500 dark:text-neutral-400',
    },
  },
});

@Directive({
  selector: '[ntSuffix]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SuffixDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() =>
    ntMerge(suffixVariants({ disabled: this.disabled() }), this.userClass()),
  );
  private disabled = signal(false);

  setDisabledState(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }
}
