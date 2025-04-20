import { effect, inject, Signal, untracked } from '@angular/core';
import {
  CreateNoteRequestDto,
  CreateNoteResponseDto,
  UpdateNoteRequestDto,
  UpdateNoteResponseDto,
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
import { ToastService } from '@web/ui';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { z } from 'zod';
import { NotesService } from '../../data-access/notes.service';

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

type RequiredProps = {
  noteId: Signal<string>;
};

function getStorageUnsavedNote(): UnsavedNote {
  try {
    const storageNote = localStorage.getItem(unsavedNoteStorageKey);
    const parsedNote = JSON.parse(storageNote || '{}');
    return unsavedNoteSchema.parse(parsedNote);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { title: '', content: '', tags: [] };
  }
}

export function withNotePersistence() {
  return signalStoreFeature(
    { props: type<RequiredProps>() },
    withState<NotePersistanceState>(() => ({
      isSavingChanges: false,
      unsavedNote: null,
    })),
    withMethods(store => ({
      updateUnsavedNote(unsavedNote: UnsavedNote) {
        patchState(store, { unsavedNote });
        localStorage.setItem(unsavedNoteStorageKey, JSON.stringify(unsavedNote));
      },
      _clearUnsavedNote() {
        patchState(store, { unsavedNote: null });
        localStorage.removeItem(unsavedNoteStorageKey);
      },
    })),
    withMethods(
      (
        store,
        notesService = inject(NotesService),
        toastService = inject(ToastService),
      ) => ({
        _createNote: rxMethod<{
          dto: CreateNoteRequestDto;
          onSuccess?: (response: CreateNoteResponseDto) => void;
        }>(
          pipe(
            tap(() => patchState(store, { isSavingChanges: true })),
            switchMap(({ dto, onSuccess }) =>
              notesService.createNote(dto).pipe(
                tap(() => toastService.success('Note saved successfully!')),
                tap(() => store._clearUnsavedNote()),
                tap(response => onSuccess && onSuccess(response)),
                finalize(() => patchState(store, { isSavingChanges: false })),
              ),
            ),
          ),
        ),
        _updateNote: rxMethod<{
          dto: UpdateNoteRequestDto;
          onSuccess?: (response: UpdateNoteResponseDto) => void;
        }>(
          pipe(
            tap(() => patchState(store, { isSavingChanges: true })),
            switchMap(({ dto, onSuccess }) =>
              notesService.updateNote(dto).pipe(
                tap(() => toastService.success('Note saved successfully!')),
                tap(response => onSuccess && onSuccess(response)),
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
          const noteId = store.noteId();
          untracked(() => {
            if (noteId === 'new' && !store.unsavedNote()) {
              patchState(store, { unsavedNote: getStorageUnsavedNote() });
            }
          });
        });
      },
    })),
  );
}
