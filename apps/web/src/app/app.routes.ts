import { Route } from '@angular/router';
import { LayoutShellComponent, PrivateShellComponent } from '@web/core/layout';

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
    component: PrivateShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full',
      },
      {
        path: 'settings',
        loadChildren: () => import('@web/settings').then(m => m.settingsRoutes),
      },
      {
        path: 'notes',
        component: LayoutShellComponent,
        loadChildren: () => import('@web/notes').then(m => m.notesRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
