import { computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginateNotesRequestParams } from '@common/models';
import { signalStore, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BreakpointService } from '@web/shared/ui';
import { debounceTime, pipe, tap } from 'rxjs';
import { withNotesPagination } from './with-notes-pagination';
import { withNotesUrlParams } from './with-notes-url-params';
import { withSelectedNote } from './with-selected-note';

export const NotesStore = signalStore(
  withNotesUrlParams(),
  withComputed(store => ({
    _requestParams: computed<PaginateNotesRequestParams>(() => ({
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
        store._loadNextPage(store._requestParams());
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
  withHooks(
    (
      store,
      breakpointService = inject(BreakpointService),
      router = inject(Router),
      activatedRoute = inject(ActivatedRoute),
    ) => ({
      onInit() {
        effect(() => store._loadFirstPage(store._requestParams()));

        effect(() => {
          if (!breakpointService.lg()) return;

          const notes = store.notes();
          const selectedNote = store.selectedNote();
          const isLoadingSelectedNote = store.isLoadingSelectedNote();

          if (notes.length && !selectedNote && !isLoadingSelectedNote) {
            router.navigate(['/notes'], {
              relativeTo: activatedRoute,
              queryParams: { note: notes[0].id },
              queryParamsHandling: 'merge',
            });
          }
        });

        effect(() => {
          const noteId = store._note();
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
    }),
  ),
);
