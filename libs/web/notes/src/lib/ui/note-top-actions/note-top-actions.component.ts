import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@web/ui';

@Component({
  selector: 'nt-note-top-actions',
  imports: [CommonModule, IconComponent, RouterLink],
  template: `
    <div class="flex justify-between gap-4 text-neutral-600 dark:text-neutral-300">
      <button
        class="flex items-center gap-1 text-preset-5"
        type="button"
        routerLink="/notes"
        [queryParams]="{ note: null }"
        queryParamsHandling="merge"
      >
        <nt-icon name="arrowLeft" />
        Go back
      </button>
      <div class="flex items-center gap-4">
        @if (showDelete()) {
          <button
            class="flex items-center justify-center text-preset-5"
            type="button"
            (click)="deleteNote.emit()"
          >
            <nt-icon name="delete" />
          </button>
        }
        @if (showArchive()) {
          <button
            class="flex items-center justify-center text-preset-5"
            type="button"
            (click)="archiveNote.emit()"
          >
            <nt-icon name="archive" />
          </button>
        }
        @if (showRestore()) {
          <button
            class="flex items-center justify-center text-preset-5"
            type="button"
            (click)="restoreNote.emit()"
          >
            <nt-icon name="restore" />
          </button>
        }
        <button
          class="flex items-center gap-1 text-preset-5 enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          [disabled]="disableCancel()"
          (click)="cancelChanges.emit()"
        >
          Cancel
        </button>
        <button
          class="flex items-center gap-1 text-preset-5 text-blue-500 enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          [disabled]="disableSave()"
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
  public showDelete = input(false);
  public disableCancel = input(false);
  public disableSave = input(false);
  public archiveNote = output();
  public restoreNote = output();
  public deleteNote = output();
  public cancelChanges = output();
}
