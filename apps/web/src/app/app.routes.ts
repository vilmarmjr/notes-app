import { Route } from '@angular/router';

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
    path: 'settings',
    loadChildren: () => import('@web/settings').then(m => m.settingsRoutes),
  },
  {
    path: 'notes',
    loadChildren: () => import('@web/notes').then(m => m.notesRoutes),
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
