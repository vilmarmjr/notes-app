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
import { BreakpointService } from '@web/ui';
import { debounceTime, pipe, tap } from 'rxjs';
import { getStatus } from '../../utils/notes/status.util';
import { TagsStore } from '../tags.store';
import { withNotePersistence } from './with-note-persistence';
import { withNotesDialogs } from './with-notes-dialogs';
import { withNotesPagination } from './with-notes-pagination';
import { withNotesUrlParams } from './with-notes-url-params';
import { withSelectedNote } from './with-selected-note';

export const NotesStore = signalStore(
  withNotesUrlParams(),
  withNotesPagination(),
  withSelectedNote(),
  withNotePersistence(),
  withNotesDialogs(),
  withComputed(store => ({
    _requestParams: computed<PaginateNotesRequestParams>(() => ({
      query: store.query(),
      status: getStatus(store.filter()),
      tag: store.tag(),
    })),
    isCreatingNewNote: computed(() => store.noteId() === 'new'),
    includeUntitledNote: computed(
      () => !!store.unsavedNote() && store.filter() === 'all',
    ),
  })),
  withMethods((store, router = inject(Router)) => ({
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
    _removeLocalNote(id: string) {
      if (store.notes().length === 1) {
        store._loadFirstPage(store._requestParams());
      } else {
        patchState(store, { notes: store.notes().filter(note => note.id !== id) });
      }
      router.navigate(['/notes'], {
        queryParams: { note: undefined },
        queryParamsHandling: 'merge',
      });
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
      deleteNote() {
        store._deleteNote({
          id: store.noteId(),
          onSuccess: () => store._removeLocalNote(store.noteId()),
        });
      },
      archiveNote() {
        store._archiveNote({
          id: store.noteId(),
          onSuccess: () => {
            store.selectNote(store.noteId());

            if (store.filter() === 'all' || store.filter() === 'tag') {
              return store._removeLocalNote(store.noteId());
            }
            if (store.filter() === 'archived') {
              return store._loadFirstPage(store._requestParams());
            }
          },
        });
      },
      restoreNote() {
        store._restoreNote({
          id: store.noteId(),
          onSuccess: () => {
            store.selectNote(store.noteId());

            if (store.filter() === 'all' || store.filter() === 'tag') {
              return store._loadFirstPage(store._requestParams());
            }
            if (store.filter() === 'archived') {
              return store._removeLocalNote(store.noteId());
            }
          },
        });
      },
      cancelNewNote() {
        store._clearUnsavedNote();
        router.navigate(['/notes'], {
          queryParams: { note: undefined },
          queryParamsHandling: 'merge',
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
          const isLoadingNotes = store.isLoading();
          const isLoadingSelectedNote = store.isLoadingSelectedNote();

          if (notes.length && !noteId && !isLoadingNotes && !isLoadingSelectedNote) {
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
