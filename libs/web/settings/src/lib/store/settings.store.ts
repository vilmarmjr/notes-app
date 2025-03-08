import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordRequestDto } from '@common/models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthService } from '@web/shared/data-access';
import { ToastService } from '@web/shared/ui';
import { catchError, finalize, of, pipe, switchMap, tap } from 'rxjs';

export type ChangePasswordParams = {
  dto: ChangePasswordRequestDto;
  onSuccess?: () => void;
};

export const SettingsStore = signalStore(
  withState({ isLoggingOut: false, isChangingPassword: false }),
  withMethods(
    (
      _store,
      _authService = inject(AuthService),
      _toastService = inject(ToastService),
      _router = inject(Router),
    ) => ({
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
      changePassword: rxMethod<ChangePasswordParams>(
        pipe(
          tap(() => patchState(_store, { isChangingPassword: true })),
          switchMap(({ dto, onSuccess }) =>
            _authService.changePassword(dto).pipe(
              tap(() => _toastService.success('Password changed successfully!')),
              tap(() => onSuccess && onSuccess()),
              catchError(() => of(undefined)),
              finalize(() => patchState(_store, { isChangingPassword: false })),
            ),
          ),
        ),
      ),
    }),
  ),
);
