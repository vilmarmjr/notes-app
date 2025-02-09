import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'n-divider',
  template: '',
  host: {
    class: 'block w-full h-[1px] bg-neutral-200 dark:bg-neutral-800',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
