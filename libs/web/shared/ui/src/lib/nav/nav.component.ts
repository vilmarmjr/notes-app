import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nt-nav',
  imports: [CommonModule],
  template: `
    <ul class="flex flex-col gap-1">
      <ng-content />
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
