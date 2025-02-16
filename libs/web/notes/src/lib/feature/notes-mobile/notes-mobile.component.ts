import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { IconComponent } from '@web/shared/ui';
import { map } from 'rxjs';
import { NotesPageType } from '../../types/notes-page-type';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';
import { NotesListHintComponent } from '../../ui/notes-list-hint/notes-list-hint.component';
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
    NotesListHintComponent,
    NotesListComponent,
    CreateNoteButtonComponent,
    RouterLink,
  ],
  template: `
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
    <h1 class="text-preset-1 dark:text-base-white mb-4 block text-neutral-950">
      <nt-notes-title [type]="type()" [tag]="tag()" />
    </h1>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesMobileComponent {
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
}
