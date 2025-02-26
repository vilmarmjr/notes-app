import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApplicationError, AuthErrors, FieldsErrors } from '@common/constants';
import { ErrorResponse } from '@common/models';
import { ToastService } from '@web/shared/ui';
import { catchError, throwError } from 'rxjs';

const errorMessages: Record<ApplicationError, string> = {
  [AuthErrors.EMAIL_IS_ALREADY_TAKEN]: 'Email is already taken',
  [AuthErrors.INCORRECT_EMAIL_OR_PASSWORD]: 'Incorrect email or password',
  [FieldsErrors.INVALID_FIELDS]: 'Invalid fields',
};

const defaultErrorMessage = 'An unexpected error occurred. Please try again';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastService = inject(ToastService);
  return next(req).pipe(
    catchError(err => {
      const error: ErrorResponse = err.error;
      _toastService.error(errorMessages[error.message] || defaultErrorMessage);
      return throwError(() => error);
    }),
  );
};
