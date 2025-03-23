import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from '@web/ui';

@Component({
  selector: 'nt-note-editor-skeleton',
  imports: [CommonModule, SkeletonModule],
  template: `
    <nt-skeleton class="flex flex-col gap-5">
      <nt-skeleton-item class="h-5 w-3/4 md:w-2/4" />
      <div class="flex w-40 gap-6">
        <nt-skeleton-item class="h-4" />
        <nt-skeleton-item class="h-4" />
      </div>
      <div class="flex w-40 gap-6">
        <nt-skeleton-item class="h-4" />
        <nt-skeleton-item class="h-4" />
      </div>
      <nt-skeleton-item class="mt-6 h-4 w-2/3 md:w-1/4" />
      <nt-skeleton-item class="h-4 w-28" />
      <nt-skeleton-item class="h-4 w-2/3 md:w-1/4" />
      <nt-skeleton-item class="h-4 w-1/3" />
      <nt-skeleton-item class="h-4 w-28" />
      <nt-skeleton-item class="h-4 w-2/3 md:w-1/4" />
      <nt-skeleton-item class="h-4 w-1/3" />
    </nt-skeleton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorSkeletonComponent {}
