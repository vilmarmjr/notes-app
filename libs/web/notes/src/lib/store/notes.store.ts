import { computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateNoteRequestDto,
  PaginateNotesRequestParams,
  PaginateNotesResponseItemDto,
  UpdateNoteRequestDto,
} from '@common/models';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TagsStore } from '@web/shared/tags';
import { BreakpointService } from '@web/shared/ui';
import { debounceTime, pipe, tap } from 'rxjs';
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
    includeUntitledNote: computed(
      () => !!store.unsavedNote() && store.filter() === 'all',
    ),
  })),
  withMethods(store => ({
    _addLocalNote(note: PaginateNotesResponseItemDto) {
      if (
        store.filter() === 'all' ||
        (store.filter() === 'tag' && note.tags.includes(store.tag()))
      ) {
        return patchState(store, { notes: [note, ...store.notes()] });
      }
      if (store.filter() !== 'archived') {
        return store._loadFirstPage(store._requestParams());
      }
    },
    _updateLocalNote(note: PaginateNotesResponseItemDto) {
      if (store.filter() === 'all' || store.filter() === 'archived') {
        patchState(store, {
          notes: store
            .notes()
            .map(currentNote => (currentNote.id === note.id ? note : currentNote)),
        });
      } else {
        store._loadFirstPage(store._requestParams());
      }
    },
  })),
  withMethods(
    (
      store,
      tagsStore = inject(TagsStore),
      router = inject(Router),
      breakpointService = inject(BreakpointService),
    ) => ({
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
      createNote(dto: CreateNoteRequestDto) {
        store._createNote({
          dto,
          onSuccess: note => {
            store._addLocalNote(note);
            tagsStore.updateTags();
            router.navigate(['/notes'], {
              queryParams: { note: note.id },
              queryParamsHandling: 'merge',
            });
          },
        });
      },
      updateNote(dto: UpdateNoteRequestDto) {
        store._updateNote({
          dto,
          onSuccess: note => {
            store._updateLocalNote(note);
            tagsStore.updateTags();
          },
        });
      },
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
