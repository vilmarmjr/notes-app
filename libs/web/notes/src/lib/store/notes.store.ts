import { computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginateNotesRequestParams } from '@common/models';
import { signalStore, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withCurrentRoute } from '@web/shared/store';
import { BreakpointService } from '@web/shared/ui';
import { debounceTime, pipe, tap } from 'rxjs';
import { NotesFilter } from '../types/notes-filter.type';
import { withNotesPagination } from './with-notes-pagination';
import { withSelectedNote } from './with-selected-note';

export const NotesStore = signalStore(
  withCurrentRoute(),
  withComputed(store => ({
    filter: computed<NotesFilter>(() => store._routeQueryParams()['filter']),
    tag: computed<string>(() => store._routeQueryParams()['tag'] || ''),
    query: computed<string>(() => store._routeQueryParams()['query'] || ''),
  })),
  withComputed(store => ({
    _params: computed<PaginateNotesRequestParams>(() => ({
      query: store.query(),
      status: store.filter() === 'archived' ? 'archived' : 'active',
      tag: store.tag(),
    })),
  })),
  withNotesPagination(),
  withSelectedNote(),
  withMethods(
    (store, router = inject(Router), breakpointService = inject(BreakpointService)) => ({
      loadNextPage() {
        store._loadNextPage(store._params());
      },
      changeQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          tap(query => {
            router.navigate(['/notes'], {
              queryParams: {
                filter: query ? 'search' : 'all',
                query: query || undefined,
                note: breakpointService.lg() ? store.selectedNote()?.id : undefined,
              },
            });
          }),
        ),
      ),
    }),
  ),
  withHooks((store, breakpointService = inject(BreakpointService)) => ({
    onInit() {
      effect(() => store._loadFirstPage(store._params()));

      effect(() => {
        if (!breakpointService.lg()) return;

        const notes = store.notes();
        const selectedNote = store.selectedNote();
        const isLoadingSelectedNote = store.isLoadingSelectedNote();

        if (notes.length && !selectedNote && !isLoadingSelectedNote) {
          store.addQueryParamsToCurrentRoute({ note: notes[0].id });
        }
      });

      effect(() => {
        const noteId = store._routeQueryParams()['note'];
        const selectedNote = store.selectedNote();

        if (noteId && selectedNote?.id !== noteId) {
          store.selectNote(noteId);
          return;
        }
        if (!noteId && selectedNote) {
          store._clearSelectedNote();
        }
      });
    },
  })),
);
