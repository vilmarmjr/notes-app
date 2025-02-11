import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'n-content',
  imports: [CommonModule],
  template: `
    <div
      class="bg-base-white h-full rounded-lg px-4 py-5 sm:rounded-t-2xl sm:px-8 sm:py-6 dark:bg-neutral-950"
    >
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {}
