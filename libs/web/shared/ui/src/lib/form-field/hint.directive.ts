import { computed, Directive, input, signal } from '@angular/core';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const hintVariants = cva('text-preset-6', {
  variants: {
    disabled: {
      true: 'text-neutral-300',
      false: 'text-neutral-600 dark:text-neutral-400',
    },
  },
});

@Directive({
  selector: '[ntHint]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HintDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() =>
    ntMerge(hintVariants({ disabled: this._disabled() }), this.userClass()),
  );
  private _disabled = signal(false);

  setDisabledState(isDisabled: boolean) {
    this._disabled.set(isDisabled);
  }
}
