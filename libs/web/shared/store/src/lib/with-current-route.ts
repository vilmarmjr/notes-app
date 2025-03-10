import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { signalStoreFeature, withProps } from '@ngrx/signals';
import { getRootRoute } from '@web/shared/utils';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs';

export function withCurrentRoute() {
  return signalStoreFeature(
    withProps(
      (_store, _router = inject(Router), _activatedRoute = inject(ActivatedRoute)) => {
        const rootRoute$ = _router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          startWith(null),
          map(() => getRootRoute(_activatedRoute)),
          shareReplay({ bufferSize: 1, refCount: true }),
        );
        return {
          routeData: toSignal(rootRoute$.pipe(switchMap(route => route.data)), {
            requireSync: true,
          }),
          routeParams: toSignal(rootRoute$.pipe(switchMap(route => route.params)), {
            requireSync: true,
          }),
          routeParamMap: toSignal(rootRoute$.pipe(switchMap(route => route.paramMap)), {
            requireSync: true,
          }),
          routeQueryParams: toSignal(
            rootRoute$.pipe(switchMap(route => route.queryParams)),
            {
              requireSync: true,
            },
          ),
          routeQueryParamMap: toSignal(
            rootRoute$.pipe(switchMap(route => route.queryParamMap)),
            { requireSync: true },
          ),
        };
      },
    ),
  );
}
