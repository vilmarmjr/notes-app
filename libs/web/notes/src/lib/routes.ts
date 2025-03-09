import { Route } from '@angular/router';
import { NotesStore } from './store/notes.store';
import { NotesPageType } from './types/notes-page-type';

export const notesRoutes: Route[] = [
  {
    path: '',
    providers: [NotesStore],
    children: [
      {
        path: 'all',
        loadComponent: () =>
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
        data: { type: 'all' satisfies NotesPageType },
      },
      {
        path: 'archived',
        loadComponent: () =>
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
        data: { type: 'archived' satisfies NotesPageType },
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
        data: { type: 'search' satisfies NotesPageType },
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('./feature/tags/tags.component').then(c => c.TagsComponent),
        data: { type: 'tags' satisfies NotesPageType },
      },
      {
        path: 'tags/:tag',
        loadComponent: () =>
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
        data: { type: 'tags' },
      },
      {
        path: '**',
        redirectTo: 'all',
      },
    ],
  },
];
