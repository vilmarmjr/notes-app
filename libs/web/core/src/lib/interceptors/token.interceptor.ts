import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthErrors, ErrorResponse } from '@common/models';
import { AuthService } from '@web/shared';
import { catchError, map, Observable, share, switchMap, tap, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';

let refreshToken$: Observable<string> | null = null;

function withToken<T>(req: HttpRequest<T>, token: string | null) {
  if (!token) {
    return req;
  }
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);

  if (!refreshToken$) {
    refreshToken$ = inject(AuthService)
      .refresh()
      .pipe(
        map(({ accessToken }) => accessToken),
        share(),
      );
  }

  return next(withToken(req, sessionService.getAccessToken())).pipe(
    catchError(response => {
      const error: ErrorResponse = response.error;

      if (error.message === AuthErrors.INVALID_OR_EXPIRED_ACCESS_TOKEN && refreshToken$) {
        return refreshToken$.pipe(
          tap(token => sessionService.setAccessToken(token)),
          switchMap(token => next(withToken(req, token))),
        );
      }

      return throwError(() => response);
    }),
  );
};
