import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nt-archived-note-toast',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex justify-between gap-2">
      <p>Note archived.</p>
      <a
        class="underline hover:text-blue-500"
        routerLink="/notes"
        queryParamsHandling="merge"
        [queryParams]="{ filter: 'archived' }"
      >
        Archived notes
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedNoteToastComponent {}
