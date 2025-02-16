import { Route } from '@angular/router';
import { ShellComponent } from '@web/core/layout';

export const settingsRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'color-theme',
        loadComponent: () =>
          import('./feature/color-theme/color-theme.component').then(
            m => m.ColorThemeComponent,
          ),
      },
      {
        path: 'font-theme',
        loadComponent: () =>
          import('./feature/font-theme/font-theme.component').then(
            m => m.FontThemeComponent,
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./feature/change-password/change-password.component').then(
            m => m.ChangePasswordComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'color-theme',
      },
    ],
  },
];
