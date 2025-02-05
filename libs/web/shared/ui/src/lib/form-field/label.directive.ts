import { Directive } from '@angular/core';

@Directive({
  selector: '[nLabel]',
  host: {
    class: 'text-neutral-950 text-preset-4',
  },
})
export class LabelDirective {}
