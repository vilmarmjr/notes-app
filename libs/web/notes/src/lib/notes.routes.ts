import { Route } from '@angular/router';
import { notesGuard } from './guards/notes.guard';

export const notesRoutes: Route[] = [
  {
    path: 'tags',
    loadComponent: () =>
      import('./feature/tags/tags.component').then(c => c.TagsComponent),
  },
  {
    path: '',
    canActivate: [notesGuard],
    loadComponent: () =>
      import('./feature/notes/notes.component').then(c => c.NotesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
