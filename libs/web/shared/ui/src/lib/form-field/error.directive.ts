import { Directive } from '@angular/core';

@Directive({
  selector: '[nError]',
  host: {
    class: 'text-preset-6 text-red-500',
  },
})
export class ErrorDirective {}
