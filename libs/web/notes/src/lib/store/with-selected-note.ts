import { inject } from '@angular/core';
import { GetNoteResponseDto } from '@common/models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { NotesService } from '../data-access/notes.service';

type SelectedNoteState = {
  selectedNote: GetNoteResponseDto | null;
  isLoadingSelectedNote: boolean;
};

export function withSelectedNote() {
  return signalStoreFeature(
    withState<SelectedNoteState>({
      selectedNote: null,
      isLoadingSelectedNote: false,
    }),
    withMethods((store, notesService = inject(NotesService)) => ({
      _clearSelectedNote() {
        patchState(store, { selectedNote: null });
      },
      selectNote: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoadingSelectedNote: true })),
          switchMap(id => notesService.getNoteById(id)),
          tapResponse({
            next: note =>
              patchState(store, { selectedNote: note, isLoadingSelectedNote: false }),
            error: () => patchState(store, { isLoadingSelectedNote: false }),
          }),
        ),
      ),
    })),
  );
}
