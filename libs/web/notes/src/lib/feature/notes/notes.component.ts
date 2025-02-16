import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import {
  BreakpointService,
  ButtonDirective,
  DividerComponent,
  IconComponent,
} from '@web/shared/ui';
import { map } from 'rxjs';
import { NotesPageType } from '../../types/notes-page-type';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';
import { NotesHeaderComponent } from '../../ui/notes-header/notes-header.component';
import { NotesListHintComponent } from '../../ui/notes-list-hint/notes-list-hint.component';
import { NotesListComponent } from '../../ui/notes-list/notes-list.component';
import { NotesTitleComponent } from '../../ui/notes-title/notes-title.component';
import { SearchFieldComponent } from '../../ui/search-field/search-field.component';
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
    NotesTitleComponent,
    NotesListHintComponent,
    RouterLink,
    SearchFieldComponent,
  ],
  template: `
    @if (lg()) {
      <div class="flex h-full flex-col">
        <nt-notes-header [type]="type()" [tag]="tag()" [query]="query()" />
        <nt-divider />
        <div class="flex min-h-0 flex-1">
          <div class="flex w-72 flex-col overflow-y-auto px-4 py-5">
            <button ntButton class="mb-4">
              <nt-icon name="plus" />
              Create new note
            </button>
            @if (type() !== 'search' && type() !== 'all') {
              <nt-notes-list-hint
                class="mb-4 block"
                [type]="type()"
                [tag]="tag()"
                [query]="query()"
              />
            }
            <nt-notes-list />
          </div>
          <nt-divider direction="vertical" />
          <nt-note-editor class="flex-1" />
        </div>
      </div>
    } @else {
      @if (type() === 'tags') {
        <div class="mb-4 flex justify-start">
          <a
            class="text-preset-5 dark:text-base-white flex items-center gap-1 text-neutral-600"
            routerLink="/notes/tags"
          >
            <nt-icon name="arrowLeft" />
            All tags
          </a>
        </div>
      }
      <nt-notes-title class="mb-4 block" [type]="type()" [tag]="tag()" />
      @if (type() === 'search') {
        <nt-search-field class="mb-4 block w-full" [query]="query()" />
      }
      @if (type() !== 'all') {
        <nt-notes-list-hint
          class="mb-4 block"
          [type]="type()"
          [tag]="tag()"
          [query]="query()"
        />
      }
      <nt-notes-list />
      <nt-create-note-button class="fixed bottom-20 right-5 sm:bottom-28 sm:right-8" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  private _activatedRoute = inject(ActivatedRoute);
  protected lg = inject(BreakpointService).lg;
  protected type = toSignal(
    this._activatedRoute.data.pipe(map<Data, NotesPageType>(data => data['type'])),
    { requireSync: true },
  );
  protected tag = toSignal(
    this._activatedRoute.paramMap.pipe(map(params => params.get('tag'))),
    { requireSync: true },
  );
  protected query = toSignal(
    this._activatedRoute.queryParamMap.pipe(map(params => params.get('query'))),
    { requireSync: true },
  );
}
