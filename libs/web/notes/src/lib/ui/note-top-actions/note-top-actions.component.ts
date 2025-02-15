import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-note-top-actions',
  imports: [CommonModule, IconComponent, RouterLink],
  template: `
    <div class="flex justify-between gap-4 text-neutral-600 dark:text-neutral-300">
      <a class="text-preset-5 flex items-center gap-1" routerLink="..">
        <nt-icon name="arrowLeft" />
        Go back
      </a>
      <div class="flex items-center gap-4">
        <button class="text-preset-5 flex items-center justify-center">
          <nt-icon name="delete" />
        </button>
        <button class="text-preset-5 flex items-center justify-center">
          <nt-icon name="archive" />
        </button>
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
export class NoteTopActionsComponent {}
