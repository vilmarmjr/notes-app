import { effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { PaginateNotesRequestParams, PaginateNotesResponseItemDto } from '@common/models';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { getRootRoute } from '@web/shared/utils';
import { filter, map, pipe, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { NotesService } from '../data-access/notes.service';
import { NotesPageType } from '../types/notes-page-type';

export const NotesStore = signalStore(
  withState(() => {
    return {
      isLoading: false,
      isLoadingNextPage: false,
      notes: [] as PaginateNotesResponseItemDto[],
      page: 1,
    };
  }),
  withProps(
    (_store, _router = inject(Router), _activatedRoute = inject(ActivatedRoute)) => {
      const rootRoute$ = _router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null),
        map(() => getRootRoute(_activatedRoute)),
        shareReplay({ refCount: true, bufferSize: 1 }),
      );
      const pageType$ = rootRoute$.pipe(
        switchMap(route => route.data),
        map<Data, NotesPageType>(data => data['type']),
      );
      const tag$ = rootRoute$.pipe(
        switchMap(route => route.paramMap),
        map(params => params.get('tag') || ''),
      );
      const query$ = rootRoute$.pipe(
        switchMap(route => route.queryParamMap),
        map(params => params.get('query') || ''),
      );
      return {
        pageType: toSignal(pageType$, { requireSync: true }),
        tag: toSignal(tag$, { requireSync: true }),
        query: toSignal(query$, { requireSync: true }),
      };
    },
  ),
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
