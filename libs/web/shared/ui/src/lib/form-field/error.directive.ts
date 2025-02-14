import { computed, Directive, input } from '@angular/core';
import { ntMerge } from '@web/shared/utils';

@Directive({
  selector: '[ntError]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ErrorDirective {
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() =>
    ntMerge('text-preset-6 text-red-500', this.userClass()),
  );
}
