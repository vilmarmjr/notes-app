import { computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginateNotesRequestParams } from '@common/models';
import { signalStore, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withCurrentRoute } from '@web/shared/store';
import { BreakpointService } from '@web/shared/ui';
import { debounceTime, distinctUntilChanged, pipe, tap } from 'rxjs';
import { NotesPageType } from '../types/notes-page-type';
import { withNotesPagination } from './with-notes-pagination';
import { withSelectedNote } from './with-selected-note';

export const NotesStore = signalStore(
  withCurrentRoute(),
  withComputed(store => ({
    pageType: computed<NotesPageType>(() => store._routeData()['type']),
    tag: computed<string>(() => store._routeParams()['tag'] || ''),
    query: computed<string>(() => store._routeQueryParams()['query'] || ''),
  })),
  withComputed(store => ({
    _params: computed<PaginateNotesRequestParams>(() => ({
      query: store.query(),
      status: store.pageType() === 'archived' ? 'archived' : 'active',
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
          distinctUntilChanged(),
          tap(query => {
            if (query || !breakpointService.lg()) {
              router.navigate(['/notes/search'], {
                queryParams: {
                  query: query || undefined,
                  note: store.selectedNote()?.id,
                },
              });
              return;
            }
            router.navigate(['/notes/all'], {
              queryParams: { note: store.selectedNote()?.id },
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
