import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonDirective, DividerComponent, IconComponent } from '@web/shared/ui';
import { ScrollEndDirective } from '@web/shared/utils';
import { NotesStore } from '../../store/notes.store';
import { NotesHeaderComponent } from '../../ui/notes-header/notes-header.component';
import { NotesListHintComponent } from '../../ui/notes-list-hint/notes-list-hint.component';
import { NotesListSkeletonComponent } from '../../ui/notes-list-skeleton/notes-list-skeleton.component';
import { NotesListComponent } from '../../ui/notes-list/notes-list.component';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'nt-notes-desktop',
  imports: [
    CommonModule,
    NotesHeaderComponent,
    DividerComponent,
    IconComponent,
    NotesListComponent,
    NotesListHintComponent,
    NotesListSkeletonComponent,
    NoteEditorComponent,
    ButtonDirective,
    ScrollEndDirective,
  ],
  template: `
    <div class="flex h-full flex-col">
      <nt-notes-header
        [filter]="store.filter()"
        [tag]="store.tag()"
        [query]="store.query()"
        (queryChange)="store.changeQuery($event)"
      />
      <nt-divider />
      <div class="flex min-h-0 flex-1">
        <div
          class="flex w-72 flex-col gap-4 overflow-y-auto px-4 py-5"
          (ntScrollEnd)="store.loadNextPage()"
        >
          <button ntButton>
            <nt-icon name="plus" />
            Create new note
          </button>
          @if (store.filter() !== 'all') {
            <nt-notes-list-hint
              [filter]="store.filter()"
              [tag]="store.tag()"
              [query]="store.query()"
            />
          }
          @if (store.isLoading()) {
            <nt-notes-list-skeleton class="mt-2 block" />
          } @else {
            <nt-notes-list [notes]="store.notes()" [filter]="store.filter()" />
          }
        </div>
        <nt-divider direction="vertical" />
        <nt-note-editor class="flex-1" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesDesktopComponent {
  protected store = inject(NotesStore);
}
