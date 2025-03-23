import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToastService } from '@web/ui';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { NotesService } from '../data-access/notes.service';
import { ArchivedNoteToastComponent } from '../ui/archived-note-toast/archived-note-toast.component';
import { RestoredNoteToastComponent } from '../ui/restored-note-toast/restored-note-toast.component';

export function withNotesDialogs() {
  return signalStoreFeature(
    withState({
      isArchiveNoteDialogOpen: false,
      isRestoreNoteDialogOpen: false,
      isDeleteNoteDialogOpen: false,
      isArchivingNote: false,
      isRestoringNote: false,
      isDeletingNote: false,
    }),
    withMethods(
      (
        store,
        notesService = inject(NotesService),
        toastService = inject(ToastService),
      ) => ({
        setArchiveDialogOpened(isOpened: boolean) {
          patchState(store, { isArchiveNoteDialogOpen: isOpened });
        },
        setRestoreDialogOpened(isOpened: boolean) {
          patchState(store, { isRestoreNoteDialogOpen: isOpened });
        },
        setDeleteDialogOpened(isOpened: boolean) {
          patchState(store, { isDeleteNoteDialogOpen: isOpened });
        },
        _archiveNote: rxMethod<{ id: string; onSuccess?: () => void }>(
          pipe(
            tap(() => patchState(store, { isArchivingNote: true })),
            switchMap(({ id, onSuccess }) =>
              notesService.archiveNote(id).pipe(
                tap(() => onSuccess && onSuccess()),
                tap(() =>
                  toastService.success(ArchivedNoteToastComponent, { width: 390 }),
                ),
                tap(() => patchState(store, { isArchiveNoteDialogOpen: false })),
                finalize(() => patchState(store, { isArchivingNote: false })),
              ),
            ),
          ),
        ),
        _restoreNote: rxMethod<{ id: string; onSuccess?: () => void }>(
          pipe(
            tap(() => patchState(store, { isRestoringNote: true })),
            switchMap(({ id, onSuccess }) =>
              notesService.restoreNote(id).pipe(
                tap(() => onSuccess && onSuccess()),
                tap(() =>
                  toastService.success(RestoredNoteToastComponent, { width: 390 }),
                ),
                tap(() => patchState(store, { isRestoreNoteDialogOpen: false })),
                finalize(() => patchState(store, { isRestoringNote: false })),
              ),
            ),
          ),
        ),
        _deleteNote: rxMethod<{ id: string; onSuccess?: () => void }>(
          pipe(
            tap(() => patchState(store, { isDeletingNote: true })),
            switchMap(({ id, onSuccess }) =>
              notesService.deleteNote(id).pipe(
                tap(() => onSuccess && onSuccess()),
                tap(() => toastService.success('Note permanently deleted.')),
                tap(() => patchState(store, { isDeleteNoteDialogOpen: false })),
                finalize(() => patchState(store, { isDeletingNote: false })),
              ),
            ),
          ),
        ),
      }),
    ),
  );
}
