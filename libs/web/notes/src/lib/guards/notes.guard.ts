import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotesFilter, notesFilters } from '@web/shared';

export const notesGuard: CanActivateFn = route => {
  const router = inject(Router);
  const filter = route.queryParamMap.get('filter');

  if (filter && notesFilters.includes(filter as NotesFilter)) {
    return true;
  }

  return router.createUrlTree(['/notes'], { queryParams: { filter: 'all' } });
};
