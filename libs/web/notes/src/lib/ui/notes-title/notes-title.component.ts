import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NotesPageType } from '../../types/notes-page-type';

@Component({
  selector: 'nt-notes-title',
  imports: [CommonModule],
  template: `
    @switch (type()) {
      @case ('all') {
        All notes
      }
      @case ('archived') {
        Archived notes
      }
      @case ('tags') {
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
  public type = input.required<NotesPageType>();
  public tag = input<string | null>(null);
  public query = input<string | null>(null);
}
