import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '@web/core';
import { AuthService } from '@web/shared';
import { catchError, map, of, tap } from 'rxjs';

export const authorizeGuard: CanActivateFn = route => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const sessionService = inject(SessionService);
  const {
    queryParams: { t: oneTimeToken },
  } = route;

  if (!oneTimeToken) {
    return router.createUrlTree(['/login']);
  }

  return authService.authorize(oneTimeToken).pipe(
    tap(({ accessToken }) => sessionService.setAccessToken(accessToken)),
    catchError(() => of(null)),
    map(() => router.createUrlTree(['/'])),
  );
};
