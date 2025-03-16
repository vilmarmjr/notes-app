import { computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginateNotesRequestParams } from '@common/models';
import { signalStore, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BreakpointService } from '@web/shared/ui';
import { debounceTime, pipe, tap } from 'rxjs';
import { createUnsavedNote } from '../utils/unsaved-note.util';
import { withNotePersistence } from './with-note-persistence';
import { withNotesPagination } from './with-notes-pagination';
import { withNotesUrlParams } from './with-notes-url-params';
import { withSelectedNote } from './with-selected-note';

export const NotesStore = signalStore(
  withNotesUrlParams(),
  withNotesPagination(),
  withSelectedNote(),
  withNotePersistence(),
  withComputed(store => ({
    _requestParams: computed<PaginateNotesRequestParams>(() => ({
      query: store.query(),
      status: store.filter() === 'archived' ? 'archived' : 'active',
      tag: store.tag(),
    })),
    isCreatingNewNote: computed(() => store.noteId() === 'new'),
    notes: computed(() => {
      const unsavedNote = store.unsavedNote();
      const pageContent = store._pageContent();
      return unsavedNote ? [createUnsavedNote(unsavedNote), ...pageContent] : pageContent;
    }),
  })),
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
                filter: query || !breakpointService.lg() ? 'search' : 'all',
                query: query || undefined,
                note: breakpointService.lg() ? store.noteId() : undefined,
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

          const notes = store._pageContent();
          const noteId = store.noteId();
          const isLoadingSelectedNote = store.isLoadingSelectedNote();

          if (notes.length && !noteId && !isLoadingSelectedNote) {
            router.navigate(['/notes'], {
              relativeTo: activatedRoute,
              queryParams: { note: notes[0].id },
              queryParamsHandling: 'merge',
            });
          }
        });

        effect(() => {
          const noteId = store.noteId();
          const selectedNote = store.selectedNote();
          const isCreatingNewNote = store.isCreatingNewNote();

          if (noteId && !isCreatingNewNote && selectedNote?.id !== noteId) {
            store.selectNote(noteId);
            return;
          }
          if ((!noteId || isCreatingNewNote) && selectedNote) {
            store._clearSelectedNote();
          }
        });
      },
    }),
  ),
);
