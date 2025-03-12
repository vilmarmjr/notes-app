import { computed, effect, inject } from '@angular/core';
import {
  GetNoteResponseDto,
  PaginateNotesRequestParams,
  PaginateNotesResponseItemDto,
} from '@common/models';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withCurrentRoute } from '@web/shared/store';
import { BreakpointService } from '@web/shared/ui';
import { pipe, switchMap, tap } from 'rxjs';
import { NotesService } from '../data-access/notes.service';
import { NotesPageType } from '../types/notes-page-type';

type NotesState = {
  isLoading: boolean;
  isLoadingNextPage: boolean;
  isLoadingSelectedNote: boolean;
  notes: PaginateNotesResponseItemDto[];
  selectedNote: GetNoteResponseDto | null;
  page: number;
  isLastPage: boolean;
};

export const NotesStore = signalStore(
  withCurrentRoute(),
  withState<NotesState>({
    isLoading: false,
    isLoadingNextPage: false,
    isLoadingSelectedNote: false,
    notes: [],
    selectedNote: null,
    page: 1,
    isLastPage: false,
  }),
  withComputed(_store => ({
    pageType: computed<NotesPageType>(() => _store.routeData()['type']),
    tag: computed(() => _store.routeParams()['tag'] || ''),
    query: computed(() => _store.routeQueryParams()['query'] || ''),
  })),
  withComputed(_store => ({
    params: computed<PaginateNotesRequestParams>(() => ({
      query: _store.query(),
      status: _store.pageType() === 'archived' ? 'archived' : 'active',
      tag: _store.tag(),
    })),
  })),
  withMethods((_store, _notesService = inject(NotesService)) => ({
    _loadNotes: rxMethod<PaginateNotesRequestParams>(
      pipe(
        tap(({ page }) =>
          patchState(_store, {
            isLoading: page === 1,
            isLoadingNextPage: !!page && page > 1,
          }),
        ),
        switchMap(params => _notesService.paginateNotes(params)),
        tapResponse({
          next: response => {
            patchState(_store, {
              isLoading: false,
              isLoadingNextPage: false,
              notes:
                response.page === 1
                  ? response.content
                  : [..._store.notes(), ...response.content],
              page: response.page,
              isLastPage: response.last,
            });
          },
          error: () => patchState(_store, { isLoading: false, isLoadingNextPage: false }),
        }),
      ),
    ),
    _clearSelectedNote() {
      patchState(_store, { selectedNote: null });
    },
    selectNote: rxMethod<string>(
      pipe(
        tap(() => patchState(_store, { isLoadingSelectedNote: true })),
        switchMap(id => _notesService.getNoteById(id)),
        tapResponse({
          next: note =>
            patchState(_store, { selectedNote: note, isLoadingSelectedNote: false }),
          error: () => patchState(_store, { isLoadingSelectedNote: false }),
        }),
      ),
    ),
  })),
  withMethods(_store => ({
    loadNextPage() {
      if (_store.isLastPage() || _store.isLoading() || _store.isLoadingNextPage()) return;

      _store._loadNotes({ ..._store.params(), page: _store.page() + 1 });
    },
  })),
  withHooks((_store, _breakpointService = inject(BreakpointService)) => ({
    onInit() {
      effect(() => _store._loadNotes({ ..._store.params(), page: 1 }));

      effect(() => {
        if (!_breakpointService.lg()) return;

        const notes = _store.notes();
        const selectedNote = _store.selectedNote();
        const isLoadingSelectedNote = _store.isLoadingSelectedNote();

        if (notes.length && !selectedNote && !isLoadingSelectedNote) {
          _store.addQueryParamsToCurrentRoute({ note: notes[0].id });
        }
      });

      effect(() => {
        const noteId = _store.routeQueryParams()['note'];
        const selectedNote = _store.selectedNote();

        if (noteId && selectedNote?.id !== noteId) {
          _store.selectNote(noteId);
          return;
        }
        if (!noteId && selectedNote) {
          _store._clearSelectedNote();
        }
      });
    },
  })),
);
