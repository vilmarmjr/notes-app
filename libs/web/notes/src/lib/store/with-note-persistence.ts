import { effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  CreateNoteRequestDto,
  PaginateNotesResponseItemDto,
  UpdateNoteRequestDto,
} from '@common/models';
import {
  patchState,
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToastService } from '@web/shared/ui';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { z } from 'zod';
import { NotesService } from '../data-access/notes.service';

const unsavedNoteStorageKey = 'nt-unsaved-note';

const unsavedNoteSchema = z.object({
  title: z.string().default(''),
  content: z.string().default(''),
  tags: z.array(z.string()).default([]),
});

type UnsavedNote = z.infer<typeof unsavedNoteSchema>;

type NotePersistanceState = {
  isSavingChanges: boolean;
  unsavedNote: UnsavedNote | null;
};

type RequiredMethods = {
  _addNote: (note: PaginateNotesResponseItemDto) => void;
  _updateNote: (note: PaginateNotesResponseItemDto) => void;
};

function getStorageUnsavedNote() {
  try {
    const storageNote = localStorage.getItem(unsavedNoteStorageKey);

    if (!storageNote) {
      return null;
    }

    const parsedNote = JSON.parse(storageNote);
    return unsavedNoteSchema.parse(parsedNote);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}

export function withNotePersistence() {
  return signalStoreFeature(
    { methods: type<RequiredMethods>() },
    withState<NotePersistanceState>(() => ({
      isSavingChanges: false,
      unsavedNote: getStorageUnsavedNote(),
    })),
    withMethods(
      (
        store,
        notesService = inject(NotesService),
        toastService = inject(ToastService),
        router = inject(Router),
      ) => ({
        updateUnsavedNote(unsavedNote: UnsavedNote) {
          patchState(store, { unsavedNote });
        },
        createNote: rxMethod<CreateNoteRequestDto>(
          pipe(
            tap(() => patchState(store, { isSavingChanges: true })),
            switchMap(dto =>
              notesService.createNote(dto).pipe(
                tap(() => toastService.success('Note saved successfully!')),
                tap(() => patchState(store, { unsavedNote: null })),
                tap(createdNote =>
                  store._addNote({
                    id: createdNote.id,
                    title: createdNote.title,
                    tags: createdNote.tags,
                    archived: createdNote.archived,
                    createdAt: createdNote.createdAt,
                  }),
                ),
                tap(createdNote =>
                  router.navigate(['/notes'], {
                    queryParams: { note: createdNote.id },
                    queryParamsHandling: 'merge',
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
    withHooks(store => ({
      onInit() {
        effect(() => {
          const unsavedNote = store.unsavedNote();
          if (unsavedNote) {
            localStorage.setItem(unsavedNoteStorageKey, JSON.stringify(unsavedNote));
          } else {
            localStorage.removeItem(unsavedNoteStorageKey);
          }
        });
      },
    })),
  );
}
