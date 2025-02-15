import { Route } from '@angular/router';
import { ShellComponent } from '@web/core/layout';

export const appRoutes: Route[] = [
  { path: 'login', loadComponent: () => import('@web/auth').then(c => c.LoginComponent) },
  {
    path: 'signup',
    loadComponent: () => import('@web/auth').then(c => c.SignupComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('@web/auth').then(c => c.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('@web/auth').then(c => c.ResetPasswordComponent),
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'notes/all', pathMatch: 'full' },
      { path: 'notes', redirectTo: 'notes/all', pathMatch: 'full' },
      {
        path: 'notes/all',
        loadComponent: () => import('@web/notes').then(c => c.NotesShellComponent),
        data: { type: 'all' },
      },
      {
        path: 'notes/archived',
        loadComponent: () => import('@web/notes').then(c => c.NotesShellComponent),
        data: { type: 'archived' },
      },
      {
        path: 'notes/search',
        loadComponent: () => import('@web/notes').then(c => c.NotesShellComponent),
        data: { type: 'search' },
      },
      {
        path: 'notes/tags',
        loadComponent: () => import('@web/notes').then(c => c.NotesShellComponent),
        data: { type: 'tags' },
      },
      {
        path: 'notes/tags/:tag',
        loadComponent: () => import('@web/notes').then(c => c.NotesShellComponent),
        data: { type: 'tags' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
