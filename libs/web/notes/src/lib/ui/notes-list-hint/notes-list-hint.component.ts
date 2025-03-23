import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NotesFilter } from '@web/shared';

@Component({
  selector: 'nt-notes-list-hint',
  imports: [CommonModule],
  template: `
    <p class="text-preset-5 text-neutral-700 dark:text-neutral-200">
      @switch (filter()) {
        @case ('archived') {
          All your archived notes are stored here. You can restore or delete them anytime.
        }
        @case ('tag') {
          @if (tag(); as tag) {
            All notes with the "{{ tag }}" tag are shown here.
          } @else {
            All notes with the selected tag are shown here.
          }
        }
        @case ('search') {
          @if (query(); as query) {
            All notes matching "{{ query }}" are displayed below.
          } @else {
            All notes matching your search query are displayed below.
          }
        }
      }
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListHintComponent {
  public filter = input.required<NotesFilter>();
  public tag = input<string | null>(null);
  public query = input<string | null>(null);
}
