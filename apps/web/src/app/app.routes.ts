import { Route } from '@angular/router';
import { ShellComponent } from '@web/core/layout';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('@web/auth').then(c => c.LoginComponent),
    title: 'Notes - Login',
  },
  {
    path: 'signup',
    loadComponent: () => import('@web/auth').then(c => c.SignupComponent),
    title: 'Notes - Sign up',
  },
  {
    path: 'recover-password',
    loadComponent: () => import('@web/auth').then(c => c.ForgotPasswordComponent),
    title: 'Notes - Recover password',
  },
  {
    path: 'reset-password',
    loadComponent: () => import('@web/auth').then(c => c.ResetPasswordComponent),
    title: 'Notes - Reset password',
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full',
      },
      {
        path: 'settings',
        loadChildren: () => import('@web/settings').then(m => m.settingsRoutes),
        title: 'Notes - Settings',
      },
      {
        path: 'notes',
        loadChildren: () => import('@web/notes').then(m => m.notesRoutes),
        title: 'Notes',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
