import { Route } from '@angular/router';
import { ShellComponent } from '@web/core/layout';
import { NotesType } from './feature/notes/notes.component';

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
        data: { type: 'all' satisfies NotesType },
      },
      {
        path: 'archived',
        loadComponent: () =>
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
        data: { type: 'archived' satisfies NotesType },
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
        data: { type: 'search' satisfies NotesType },
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('./feature/notes-shell/notes-shell.component').then(
            c => c.NotesShellComponent,
          ),
        data: { type: 'tags' satisfies NotesType },
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
