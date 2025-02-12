import { Directive } from '@angular/core';

@Directive({
  selector: '[ntError]',
  host: {
    class: 'text-preset-6 text-red-500',
  },
})
export class ErrorDirective {}
