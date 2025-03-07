import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthService } from '@web/shared/data-access';
import { catchError, finalize, of, pipe, switchMap, tap } from 'rxjs';

export const SettingsStore = signalStore(
  withState({ isLoggingOut: false, isSavingColorTheme: false }),
  withMethods((_store, _authService = inject(AuthService), _router = inject(Router)) => ({
    logOut: rxMethod<void>(
      pipe(
        tap(() => patchState(_store, { isLoggingOut: true })),
        switchMap(() =>
          _authService.logOut().pipe(
            tap(() => _router.navigate(['/login'])),
            catchError(() => of(undefined)),
            finalize(() => patchState(_store, { isLoggingOut: false })),
          ),
        ),
      ),
    ),
  })),
);
