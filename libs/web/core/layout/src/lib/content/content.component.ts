import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nt-content',
  imports: [CommonModule],
  template: `
    <div class="h-full bg-neutral-100 dark:bg-neutral-800">
      <div
        class="bg-base-white h-full rounded-t-lg p-4 sm:rounded-t-2xl sm:p-6 dark:bg-neutral-950"
      >
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {}
