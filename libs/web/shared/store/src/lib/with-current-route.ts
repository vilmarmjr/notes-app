import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  QueryParamsHandling,
  Router,
} from '@angular/router';
import { signalStoreFeature, withMethods, withProps } from '@ngrx/signals';
import { getRootRoute } from '@web/shared/utils';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs';

export function withCurrentRoute() {
  return signalStoreFeature(
    withProps(
      (_store, router = inject(Router), activatedRoute = inject(ActivatedRoute)) => {
        const rootRoute$ = router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          startWith(null),
          map(() => getRootRoute(activatedRoute)),
          shareReplay({ bufferSize: 1, refCount: true }),
        );
        return {
          _routeData: toSignal(rootRoute$.pipe(switchMap(route => route.data)), {
            requireSync: true,
          }),
          _routeParams: toSignal(rootRoute$.pipe(switchMap(route => route.params)), {
            requireSync: true,
          }),
          _routeQueryParams: toSignal(
            rootRoute$.pipe(switchMap(route => route.queryParams)),
            {
              requireSync: true,
            },
          ),
        };
      },
    ),
    withMethods(
      (_store, router = inject(Router), activatedRoute = inject(ActivatedRoute)) => ({
        addQueryParamsToCurrentRoute(
          queryParams: Params,
          queryParamsHandling: QueryParamsHandling = 'merge',
        ) {
          router.navigate([], {
            relativeTo: activatedRoute,
            queryParams,
            queryParamsHandling,
          });
        },
      }),
    ),
  );
}
