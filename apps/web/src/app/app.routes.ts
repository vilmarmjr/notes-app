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
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      {
        path: 'notes',
        loadComponent: () => import('@web/notes').then(c => c.NotesComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
