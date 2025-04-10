import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApplicationError,
  AuthErrors,
  ErrorResponse,
  FieldsErrors,
  NotesErrors,
} from '@common/models';
import { ToastService } from '@web/ui';
import { catchError, throwError } from 'rxjs';

const errorMessages: Record<ApplicationError, string> = {
  [AuthErrors.EMAIL_IS_ALREADY_TAKEN]: 'Email is already taken',
  [AuthErrors.INCORRECT_EMAIL_OR_PASSWORD]: 'Incorrect email or password',
  [AuthErrors.UNAUTHORIZED]:
    'You are not authorized to perform this action. Please log in to continue',
  [AuthErrors.INVALID_OLD_PASSWORD]: 'Invalid old password',
  [AuthErrors.OLD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT]:
    'Old and new password must be different',
  [AuthErrors.INVALID_OR_EXPIRED_ACCESS_TOKEN]: 'The session is expired',
  [FieldsErrors.INVALID_FIELDS]: 'Invalid fields',
  [NotesErrors.NOTE_NOT_FOUND]: 'Note not found',
};

const defaultErrorMessage = 'An unexpected error occurred. Please try again';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(response => {
      const error: ErrorResponse = response.error;

      if (
        error.message !== AuthErrors.INVALID_OR_EXPIRED_ACCESS_TOKEN &&
        error.message !== AuthErrors.UNAUTHORIZED
      ) {
        toastService.error(errorMessages[error.message] || defaultErrorMessage);
      }

      if (error.message === AuthErrors.UNAUTHORIZED) {
        router.navigate(['/login']);
      }

      return throwError(() => response);
    }),
  );
};
