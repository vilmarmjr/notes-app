import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordRequestDto } from '@common/models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthService } from '@web/shared';
import { ToastService } from '@web/ui';
import { catchError, finalize, of, pipe, switchMap, tap } from 'rxjs';

export type ChangePasswordParams = {
  dto: ChangePasswordRequestDto;
  onSuccess?: () => void;
};

export const SettingsStore = signalStore(
  withState({ isLoggingOut: false, isChangingPassword: false }),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      toastService = inject(ToastService),
      router = inject(Router),
    ) => ({
      logOut: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoggingOut: true })),
          switchMap(() =>
            authService.logOut().pipe(
              tap(() => router.navigate(['/login'])),
              catchError(() => of(undefined)),
              finalize(() => patchState(store, { isLoggingOut: false })),
            ),
          ),
        ),
      ),
      changePassword: rxMethod<ChangePasswordParams>(
        pipe(
          tap(() => patchState(store, { isChangingPassword: true })),
          switchMap(({ dto, onSuccess }) =>
            authService.changePassword(dto).pipe(
              tap(() => toastService.success('Password changed successfully!')),
              tap(() => onSuccess && onSuccess()),
              catchError(() => of(undefined)),
              finalize(() => patchState(store, { isChangingPassword: false })),
            ),
          ),
        ),
      ),
    }),
  ),
);
