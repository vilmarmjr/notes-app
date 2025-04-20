import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nt-restore-note-toast',
  imports: [CommonModule, RouterLink],
  host: {
    class: 'w-full',
  },
  template: `
    <div class="flex justify-between gap-2">
      <p>Note restored to active notes.</p>
      <a
        class="underline hover:text-blue-500"
        routerLink="/notes"
        queryParamsHandling="merge"
        [queryParams]="{ filter: 'all' }"
      >
        All notes
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoredNoteToastComponent {}
