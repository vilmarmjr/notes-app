import { computed, Directive, input } from '@angular/core';
import { ntMerge } from '../core/merge';

@Directive({
  selector: '[ntLabel]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class LabelDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() =>
    ntMerge('text-neutral-950 text-preset-4 dark:text-base-white', this.userClass()),
  );
}
