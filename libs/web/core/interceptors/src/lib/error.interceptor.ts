import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApplicationError,
  AuthErrors,
  ErrorResponse,
  FieldsErrors,
} from '@common/models';
import { ToastService } from '@web/shared/ui';
import { catchError, throwError } from 'rxjs';

const errorMessages: Record<ApplicationError, string> = {
  [AuthErrors.EMAIL_IS_ALREADY_TAKEN]: 'Email is already taken',
  [AuthErrors.INCORRECT_EMAIL_OR_PASSWORD]: 'Incorrect email or password',
  [AuthErrors.UNAUTHORIZED]: 'You are not authorized to perform this action',
  [FieldsErrors.INVALID_FIELDS]: 'Invalid fields',
};

const defaultErrorMessage = 'An unexpected error occurred. Please try again';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastService = inject(ToastService);
  const _router = inject(Router);
  return next(req).pipe(
    catchError(err => {
      const error: ErrorResponse = err.error;

      _toastService.error(errorMessages[error.message] || defaultErrorMessage);

      if (error.statusCode === HttpStatusCode.Unauthorized) {
        _router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
