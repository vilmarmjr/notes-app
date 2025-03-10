import { computed, effect, inject } from '@angular/core';
import { PaginateNotesRequestParams, PaginateNotesResponseItemDto } from '@common/models';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withCurrentRoute } from '@web/shared/store';
import { pipe, switchMap, tap } from 'rxjs';
import { NotesService } from '../data-access/notes.service';
import { NotesPageType } from '../types/notes-page-type';

export const NotesStore = signalStore(
  withCurrentRoute(),
  withState(() => {
    return {
      isLoading: false,
      isLoadingNextPage: false,
      notes: [] as PaginateNotesResponseItemDto[],
      page: 1,
    };
  }),
  withComputed(_store => ({
    pageType: computed<NotesPageType>(() => _store.routeData()['type']),
    tag: computed(() => _store.routeParamMap().get('tag') || ''),
    query: computed(() => _store.routeQueryParamMap().get('query') || ''),
  })),
  withMethods((_store, _notesService = inject(NotesService)) => ({
    _loadNotes: rxMethod<PaginateNotesRequestParams>(
      pipe(
        tap(() => patchState(_store, { isLoading: true })),
        switchMap(params => _notesService.paginateNotes(params)),
        tapResponse({
          next: response => {
            patchState(_store, {
              isLoading: false,
              notes: response.content,
              page: _store.page() + 1,
            });
          },
          error: () => patchState(_store, { isLoading: false }),
        }),
      ),
    ),
  })),
  withHooks(_store => ({
    onInit() {
      effect(() => {
        const params: PaginateNotesRequestParams = {
          query: _store.query(),
          status: _store.pageType() === 'archived' ? 'archived' : 'active',
          tag: _store.tag(),
          take: 15,
          page: 1,
        };
        _store._loadNotes(params);
      });
    },
  })),
);
