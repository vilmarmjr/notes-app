import { computed, Directive, signal } from '@angular/core';
import { cva } from 'class-variance-authority';

const hintVariants = cva('text-preset-6', {
  variants: {
    disabled: {
      true: 'text-neutral-300',
      false: 'text-neutral-600',
    },
  },
});

@Directive({
  selector: '[nHint]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HintDirective {
  private _disabled = signal(false);
  protected computedClass = computed(() => hintVariants({ disabled: this._disabled() }));

  setDisabledState(isDisabled: boolean) {
    this._disabled.set(isDisabled);
  }
}
