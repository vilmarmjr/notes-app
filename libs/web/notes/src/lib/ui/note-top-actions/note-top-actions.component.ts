import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-note-top-actions',
  imports: [CommonModule, IconComponent],
  template: `
    <div class="flex justify-between gap-4 text-neutral-600 dark:text-neutral-300">
      <button class="text-preset-5 flex items-center gap-1" (click)="location.back()">
        <nt-icon name="arrowLeft" />
        Go back
      </button>
      <div class="flex items-center gap-4">
        <button class="text-preset-5 flex items-center justify-center">
          <nt-icon name="delete" />
        </button>
        @if (showArchive()) {
          <button class="text-preset-5 flex items-center justify-center">
            <nt-icon name="archive" />
          </button>
        }
        @if (showRestore()) {
          <button class="text-preset-5 flex items-center justify-center">
            <nt-icon name="restore" />
          </button>
        }
        <button class="text-preset-5 flex items-center gap-1 hover:underline">
          Cancel
        </button>
        <button
          class="text-preset-5 flex items-center gap-1 text-blue-500 hover:underline"
        >
          Save note
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteTopActionsComponent {
  public showArchive = input(false);
  public showRestore = input(false);
  protected location = inject(Location);
}
