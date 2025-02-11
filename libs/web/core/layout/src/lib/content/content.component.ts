import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'n-content',
  imports: [CommonModule],
  template: `
    <div class="bg-base-white h-full rounded-t-2xl px-8 py-6 dark:bg-neutral-950">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {}
