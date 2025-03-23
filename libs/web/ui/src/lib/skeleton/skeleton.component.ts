import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nt-skeleton',
  imports: [CommonModule],
  host: {
    role: 'status',
  },
  template: `
    <ng-content />
    <span class="sr-only">Loading...</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {}
