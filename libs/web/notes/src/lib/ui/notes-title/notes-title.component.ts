import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NotesFilter } from '@web/shared';

@Component({
  selector: 'nt-notes-title',
  imports: [CommonModule],
  template: `
    @switch (filter()) {
      @case ('all') {
        All notes
      }
      @case ('archived') {
        Archived notes
      }
      @case ('tag') {
        @if (tag(); as tag) {
          <span class="text-neutral-600 dark:text-neutral-300">Notes tagged:</span>
          {{ tag }}
        } @else {
          Tags
        }
      }
      @case ('search') {
        @if (query(); as query) {
          <span class="text-neutral-600 dark:text-neutral-300">Showing results for:</span>
          {{ query }}
        } @else {
          Search
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesTitleComponent {
  public filter = input.required<NotesFilter>();
  public tag = input<string | null>(null);
  public query = input<string | null>(null);
}
