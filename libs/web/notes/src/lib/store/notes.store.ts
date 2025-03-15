import { computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateNoteRequestDto,
  PaginateNotesRequestParams,
  UpdateNoteRequestDto,
} from '@common/models';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BreakpointService, ToastService } from '@web/shared/ui';
import { debounceTime, finalize, pipe, switchMap, tap } from 'rxjs';
import { NotesService } from '../data-access/notes.service';
import { withNotesPagination } from './with-notes-pagination';
import { withNotesUrlParams } from './with-notes-url-params';
import { withSelectedNote } from './with-selected-note';

export const NotesStore = signalStore(
  withState({ isSavingChanges: false }),
  withNotesUrlParams(),
  withComputed(store => ({
    _requestParams: computed<PaginateNotesRequestParams>(() => ({
      query: store.query(),
      status: store.filter() === 'archived' ? 'archived' : 'active',
      tag: store.tag(),
    })),
    isCreatingNewNote: computed(() => store.noteId() === 'new'),
  })),
  withNotesPagination(),
  withSelectedNote(),
  withMethods(
    (
      store,
      router = inject(Router),
      breakpointService = inject(BreakpointService),
      notesService = inject(NotesService),
      toastService = inject(ToastService),
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
      createNote: rxMethod<CreateNoteRequestDto>(
        pipe(
          tap(() => patchState(store, { isSavingChanges: true })),
          switchMap(dto =>
            notesService.createNote(dto).pipe(
              tap(() => toastService.success('Note saved successfully!')),
              tap(createdNote =>
                store._addNote({
                  id: createdNote.id,
                  title: createdNote.title,
                  tags: createdNote.tags,
                  archived: createdNote.archived,
                  createdAt: createdNote.createdAt,
                }),
              ),
              finalize(() => patchState(store, { isSavingChanges: false })),
            ),
          ),
        ),
      ),
      updateNote: rxMethod<UpdateNoteRequestDto>(
        pipe(
          tap(() => patchState(store, { isSavingChanges: true })),
          switchMap(dto =>
            notesService.updateNote(dto).pipe(
              tap(() => toastService.success('Note saved successfully!')),
              tap(updatedNote =>
                store._updateNote({
                  id: updatedNote.id,
                  title: updatedNote.title,
                  tags: updatedNote.tags,
                  archived: updatedNote.archived,
                  createdAt: updatedNote.createdAt,
                }),
              ),
              finalize(() => patchState(store, { isSavingChanges: false })),
            ),
          ),
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
