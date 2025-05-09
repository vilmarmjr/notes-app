import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { signalStoreFeature, withProps } from '@ngrx/signals';
import { filter, map } from 'rxjs';
import { NotesFilter } from '../../types/notes-filter.type';

export function withNotesUrlParams() {
  return signalStoreFeature(
    withProps(
      (_store, activatedRoute = inject(ActivatedRoute), router = inject(Router)) => {
        const queryParams$ = activatedRoute.queryParamMap.pipe(
          filter(() => router.url.startsWith('/notes')),
        );
        const filter$ = queryParams$.pipe(
          map(params => params.get('filter') as NotesFilter),
        );
        const tag$ = queryParams$.pipe(map(params => params.get('tag') || ''));
        const query$ = queryParams$.pipe(map(params => params.get('query') || ''));
        const note$ = queryParams$.pipe(map(params => params.get('note') || ''));
        return {
          filter: toSignal(filter$, { requireSync: true }),
          tag: toSignal(tag$, { requireSync: true }),
          query: toSignal(query$, { requireSync: true }),
          noteId: toSignal(note$, { requireSync: true }),
        };
      },
    ),
  );
}
