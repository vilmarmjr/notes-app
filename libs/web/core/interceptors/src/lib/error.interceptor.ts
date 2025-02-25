import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApplicationError, AuthError, FieldsError } from '@common/constants';
import { ErrorResponse } from '@common/models';
import { ToastService } from '@web/shared/ui';
import { catchError, throwError } from 'rxjs';

const errorMessages: Record<ApplicationError, string> = {
  [AuthError.EMAIL_IS_ALREADY_TAKEN]: 'Email is already taken',
  [AuthError.INCORRECT_EMAIL_OR_PASSWORD]: 'Incorrect email or password',
  [FieldsError.INVALID_FIELDS]: 'Invalid fields',
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastService = inject(ToastService);
  return next(req).pipe(
    catchError(err => {
      const error: ErrorResponse = err.error;
      _toastService.error(errorMessages[error.message] || 'An unexpected error occurred');
      return throwError(() => error);
    }),
  );
};
