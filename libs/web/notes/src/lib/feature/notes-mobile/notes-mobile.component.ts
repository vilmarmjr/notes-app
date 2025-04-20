import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotesStore } from '@web/shared';
import { IconComponent } from '@web/ui';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';
import { NotesListHintComponent } from '../../ui/notes-list-hint/notes-list-hint.component';
import { NotesListSkeletonComponent } from '../../ui/notes-list-skeleton/notes-list-skeleton.component';
import { NotesListComponent } from '../../ui/notes-list/notes-list.component';
import { NotesTitleComponent } from '../../ui/notes-title/notes-title.component';
import { SearchFieldComponent } from '../../ui/search-field/search-field.component';

@Component({
  selector: 'nt-notes-mobile',
  imports: [
    CommonModule,
    IconComponent,
    NotesTitleComponent,
    SearchFieldComponent,
    NotesListComponent,
    NotesListHintComponent,
    NotesListSkeletonComponent,
    CreateNoteButtonComponent,
    RouterLink,
  ],
  template: `
    @if (store.filter() === 'tag') {
      <div class="mb-4 flex justify-start">
        <a
          class="flex items-center gap-1 text-preset-5 text-neutral-600 dark:text-base-white"
          routerLink="/notes/tags"
        >
          <nt-icon name="arrowLeft" />
          All tags
        </a>
      </div>
    }
    <h1 class="mb-4 block text-preset-1 text-neutral-950 dark:text-base-white">
      <nt-notes-title [filter]="store.filter()" [tag]="store.tag()" />
    </h1>
    @if (store.filter() === 'search') {
      <nt-search-field
        class="mb-4 block w-full"
        [query]="store.query()"
        (queryChange)="store.changeQuery($event)"
      />
    }
    @if (store.filter() !== 'all') {
      <nt-notes-list-hint
        class="mb-4 block"
        [filter]="store.filter()"
        [tag]="store.tag()"
        [query]="store.query()"
      />
    }
    @if (store.isLoading()) {
      <nt-notes-list-skeleton class="mt-6 block" />
    } @else {
      <nt-notes-list
        [notes]="store.notes()"
        [filter]="store.filter()"
        [includeUntitledNote]="store.includeUntitledNote()"
      />
    }
    <nt-create-note-button class="fixed bottom-20 right-5 sm:bottom-28 sm:right-8" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesMobileComponent {
  protected store = inject(NotesStore);
}
