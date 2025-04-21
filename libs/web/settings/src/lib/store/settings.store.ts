import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordRequestDto, GetMeResponse, SignInMethods } from '@common/models';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SessionService } from '@web/core';
import { AuthService, UsersService } from '@web/shared';
import { ToastService } from '@web/ui';
import { catchError, filter, finalize, of, pipe, switchMap, tap } from 'rxjs';

export type ChangePasswordParams = {
  dto: ChangePasswordRequestDto;
  onSuccess?: () => void;
};

export const SettingsStore = signalStore(
  withState({
    isLoggingOut: false,
    isChangingPassword: false,
    isLoadingUser: false,
    user: null as GetMeResponse | null,
  }),
  withComputed(store => ({
    canChangePassword: computed(
      () => store.user()?.signInMethod === SignInMethods.EMAIL_AND_PASSWORD,
    ),
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      usersService = inject(UsersService),
      sessionService = inject(SessionService),
      toastService = inject(ToastService),
      router = inject(Router),
    ) => ({
      logOut: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoggingOut: true })),
          switchMap(() =>
            authService.logOut().pipe(
              tap(() => sessionService.clearAccessToken()),
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
      _loadUser: rxMethod<void>(
        pipe(
          filter(() => !store.user()),
          tap(() => patchState(store, { isLoadingUser: true })),
          switchMap(() =>
            usersService.getMe().pipe(
              tap(user => patchState(store, { user })),
              finalize(() => patchState(store, { isLoadingUser: false })),
            ),
          ),
        ),
      ),
    }),
  ),
  withHooks(store => ({
    onInit() {
      store._loadUser();
    },
  })),
);
