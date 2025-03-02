import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data } from '@angular/router';
import { ButtonDirective, DividerComponent, IconComponent } from '@web/shared/ui';
import { map } from 'rxjs';
import { NotesPageType } from '../../types/notes-page-type';
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
  ],
  template: `
    <div class="flex h-full flex-col">
      <nt-notes-header [type]="type()" [tag]="tag()" [query]="query()" />
      <nt-divider />
      <div class="flex min-h-0 flex-1">
        <div class="flex w-72 flex-col gap-4 overflow-y-auto px-4 py-5">
          <button ntButton>
            <nt-icon name="plus" />
            Create new note
          </button>
          @if (type() !== 'search' && type() !== 'all') {
            <nt-notes-list-hint [type]="type()" [tag]="tag()" [query]="query()" />
          } @else if (loading()) {
            <nt-notes-list-skeleton class="mt-2 block" />
          } @else {
            <nt-notes-list />
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
  private _activatedRoute = inject(ActivatedRoute);
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
  protected loading = signal(true);

  constructor() {
    setTimeout(() => this.loading.set(false), 1000);
  }
}
