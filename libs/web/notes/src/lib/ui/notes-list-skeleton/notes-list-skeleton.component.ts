import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from '@web/shared/ui';
import { generateRandomNumber } from '@web/shared/utils';

@Component({
  selector: 'nt-notes-list-skeleton',
  imports: [CommonModule, SkeletonModule],
  template: `
    <nt-skeleton class="flex flex-col gap-4">
      @for (item of items; track $index; let last = $last) {
        <div class="flex flex-col gap-3" [class.mb-2]="!last">
          <nt-skeleton-item class="h-4" [style.width]="item + '%'" />
          <div class="flex gap-2">
            <nt-skeleton-item class="h-5 w-16" />
            <nt-skeleton-item class="h-5 w-16" />
          </div>
          <nt-skeleton-item class="h-4 w-20" />
        </div>
      }
    </nt-skeleton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListSkeletonComponent {
  protected items = Array.from({ length: 5 }).map(() => generateRandomNumber(60, 100));
}
