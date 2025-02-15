import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  BreakpointService,
  ButtonDirective,
  DividerComponent,
  IconComponent,
} from '@web/shared/ui';
import { map } from 'rxjs';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';
import { NotesHeaderComponent } from '../../ui/notes-header/notes-header.component';
import { NotesListComponent } from '../../ui/notes-list/notes-list.component';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'nt-notes',
  imports: [
    CommonModule,
    CreateNoteButtonComponent,
    NotesListComponent,
    NotesHeaderComponent,
    DividerComponent,
    IconComponent,
    ButtonDirective,
    NoteEditorComponent,
  ],
  template: `
    @if (lg()) {
      <div class="flex h-full flex-col">
        <nt-notes-header>
          <ng-container notesHeaderTitle>
            @switch (type()) {
              @case ('all') {
                All notes
              }
              @case ('archived') {
                Archived notes
              }
              @case ('tags') {
                <span class="text-neutral-600 dark:text-neutral-300">Notes tagged:</span>
                Dev
              }
              @case ('search') {
                <span class="text-neutral-600 dark:text-neutral-300">
                  Showing results for:
                </span>
                Dev
              }
            }
          </ng-container>
        </nt-notes-header>
        <nt-divider />
        <div class="flex min-h-0 flex-1">
          <div class="flex w-72 flex-col overflow-y-auto px-4 py-5">
            <button ntButton class="mb-4">
              <nt-icon name="plus" />
              Create new note
            </button>
            <nt-notes-list />
          </div>
          <nt-divider direction="vertical" />
          <nt-note-editor class="flex-1" />
        </div>
      </div>
    } @else {
      <h1 class="text-preset-1 dark:text-base-white mb-4 text-neutral-950">All Notes</h1>
      <nt-notes-list />
      <nt-create-note-button class="fixed bottom-20 right-5 sm:bottom-28 sm:right-8" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  private _activatedRoute = inject(ActivatedRoute);
  protected lg = inject(BreakpointService).lg;
  protected type = toSignal(this._activatedRoute.data.pipe(map(data => data['type'])));
}
