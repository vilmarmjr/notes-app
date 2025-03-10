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

export const NotesStore = signalStore(
  withCurrentRoute(),
  withState({
    isLoading: false,
    isLoadingNextPage: false,
    isLoadingSelectedNote: false,
    notes: [] as PaginateNotesResponseItemDto[],
    selectedNote: null as GetNoteResponseDto | null,
    page: 1,
  }),
  withComputed(_store => ({
    pageType: computed<NotesPageType>(() => _store.routeData()['type']),
    tag: computed(() => _store.routeParamMap().get('tag') || ''),
    query: computed(() => _store.routeQueryParamMap().get('query') || ''),
  })),
  withMethods((_store, _notesService = inject(NotesService)) => ({
    _loadNotes: rxMethod<PaginateNotesRequestParams>(
      pipe(
        tap(() => patchState(_store, { isLoading: true })),
        switchMap(params => _notesService.paginateNotes(params)),
        tapResponse({
          next: response => {
            patchState(_store, {
              isLoading: false,
              notes: response.content,
              page: _store.page() + 1,
            });
          },
          error: () => patchState(_store, { isLoading: false }),
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
  withHooks((_store, _breakpointService = inject(BreakpointService)) => ({
    onInit() {
      effect(() => {
        const params: PaginateNotesRequestParams = {
          query: _store.query(),
          status: _store.pageType() === 'archived' ? 'archived' : 'active',
          tag: _store.tag(),
          take: 15,
          page: 1,
        };
        _store._loadNotes(params);
      });

      effect(() => {
        if (!_breakpointService.lg()) return;

        const notes = _store.notes();
        const selectedNote = _store.selectedNote();

        if (notes.length && !selectedNote) {
          _store.addQueryParamsToCurrentRoute({ note: notes[0].id });
        }
      });

      effect(() => {
        const noteId = _store.routeQueryParamMap().get('note');
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
