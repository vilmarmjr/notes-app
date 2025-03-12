import { inject } from '@angular/core';
import { PaginateNotesRequestParams, PaginateNotesResponseItemDto } from '@common/models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { NotesService } from '../data-access/notes.service';

type NotesPaginationState = {
  isLoading: boolean;
  isLoadingNextPage: boolean;
  notes: PaginateNotesResponseItemDto[];
  _page: number;
  _isLastPage: boolean;
};

export function withNotesPagination() {
  return signalStoreFeature(
    withState<NotesPaginationState>({
      isLoading: false,
      isLoadingNextPage: false,
      notes: [],
      _page: 1,
      _isLastPage: false,
    }),
    withMethods((store, notesService = inject(NotesService)) => ({
      _loadNotes: rxMethod<PaginateNotesRequestParams>(
        pipe(
          tap(({ page }) =>
            patchState(store, {
              isLoading: page === 1,
              isLoadingNextPage: !!page && page > 1,
            }),
          ),
          switchMap(params => notesService.paginateNotes(params)),
          tapResponse({
            next: response => {
              patchState(store, {
                isLoading: false,
                isLoadingNextPage: false,
                notes:
                  response.page === 1
                    ? response.content
                    : [...store.notes(), ...response.content],
                _page: response.page,
                _isLastPage: response.last,
              });
            },
            error: () =>
              patchState(store, { isLoading: false, isLoadingNextPage: false }),
          }),
        ),
      ),
    })),
    withMethods(store => ({
      _loadFirstPage(params: PaginateNotesRequestParams) {
        store._loadNotes({ ...params, page: 1 });
      },
      _loadNextPage(params: PaginateNotesRequestParams) {
        if (store._isLastPage() || store.isLoading() || store.isLoadingNextPage()) return;

        store._loadNotes({ ...params, page: store._page() + 1 });
      },
    })),
  );
}
