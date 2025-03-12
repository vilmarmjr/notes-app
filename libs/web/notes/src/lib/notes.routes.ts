import { Route } from '@angular/router';
import { LayoutShellComponent } from '@web/core/layout';
import { NotesShellComponent } from './feature/notes-shell/notes-shell.component';
import { NotesPageType } from './types/notes-page-type';

export const notesRoutes: Route[] = [
  {
    path: 'tags',
    component: LayoutShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./feature/tags/tags.component').then(c => c.TagsComponent),
      },
    ],
  },
  {
    path: '',
    component: NotesShellComponent,
    children: [
      {
        path: 'all',
        loadComponent: () =>
          import('./feature/notes/notes.component').then(c => c.NotesComponent),
        data: { type: 'all' satisfies NotesPageType },
      },
      {
        path: 'archived',
        loadComponent: () =>
          import('./feature/notes/notes.component').then(c => c.NotesComponent),
        data: { type: 'archived' satisfies NotesPageType },
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./feature/notes/notes.component').then(c => c.NotesComponent),
        data: { type: 'search' satisfies NotesPageType },
      },
      {
        path: 'tags/:tag',
        loadComponent: () =>
          import('./feature/notes/notes.component').then(c => c.NotesComponent),
        data: { type: 'tags' },
      },
      {
        path: '**',
        redirectTo: 'all',
      },
    ],
  },
];
