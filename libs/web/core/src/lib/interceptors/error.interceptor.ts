import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthErrors, ErrorResponse } from '@common/models';
import { errorMessages } from '@web/shared';
import { ToastService } from '@web/ui';
import { catchError, throwError } from 'rxjs';

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
