import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { notesFilters } from '../constants/notes-filters.constant';
import { NotesFilter } from '../types/notes-filter.type';

export const notesGuard: CanActivateFn = route => {
  const router = inject(Router);
  const filter = route.queryParamMap.get('filter');

  if (filter && notesFilters.includes(filter as NotesFilter)) {
    return true;
  }

  return router.createUrlTree(['/notes'], { queryParams: { filter: 'all' } });
};
