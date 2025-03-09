import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { TagsService } from '../data-access/tags.service';

export const TagsStore = signalStore(
  withState({ isLoadingTags: false, tags: [] as string[] }),
  withMethods((_store, tagsService = inject(TagsService)) => ({
    loadTags: rxMethod<void>(
      pipe(
        tap(() => patchState(_store, { isLoadingTags: true })),
        switchMap(() => tagsService.getTags()),
        tapResponse({
          next: tags => patchState(_store, { isLoadingTags: false, tags }),
          error: () => patchState(_store, { isLoadingTags: false }),
        }),
      ),
    ),
  })),
  withHooks(_store => ({
    onInit: () => _store.loadTags(),
  })),
);
