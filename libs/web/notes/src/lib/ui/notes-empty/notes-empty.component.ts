import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NotesPageType } from '../../types/notes-page-type';

@Component({
  selector: 'nt-notes-empty',
  imports: [CommonModule],
  template: `
    <div
      class="text-preset-5 dark:text-base-white rounded-lg border border-neutral-200 bg-neutral-100 p-2 text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800"
    >
      @switch (type()) {
        @case ('archived') {
          No notes have been archived yet. Move notes here for safekeeping, or create a
          new note.
        }
        @case ('search') {
          No notes match your search. Try a different keyword or create a new note.
        }
        @case ('all') {
          You don't have any notes yet. Start a new note to capture your thoughts and
          ideas.
        }
        @case ('tags') {
          No notes found with the selected tag.
        }
        @default {
          No notes found.
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesEmptyComponent {
  public type = input.required<NotesPageType>();
}
