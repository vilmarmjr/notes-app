import { Route } from '@angular/router';
import { ShellComponent } from '@web/core/layout';
import { NotesPageType } from './types/notes-page-type';

export const notesRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
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
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
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
    ],
  },
];
