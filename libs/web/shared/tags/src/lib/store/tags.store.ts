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
  withMethods((store, tagsService = inject(TagsService)) => ({
    loadTags: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoadingTags: true })),
        switchMap(() => tagsService.getTags()),
        tapResponse({
          next: tags => patchState(store, { isLoadingTags: false, tags }),
          error: () => patchState(store, { isLoadingTags: false }),
        }),
      ),
    ),
  })),
  withHooks(store => ({
    onInit: () => store.loadTags(),
  })),
);
