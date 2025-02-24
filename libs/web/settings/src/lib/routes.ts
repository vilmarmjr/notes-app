import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { ShellComponent } from '@web/core/layout';
import { BreakpointService } from '@web/shared/ui';
import { SettingsStore } from './store/settings.store';

export const settingsRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    providers: [SettingsStore],
    children: [
      {
        path: '',
        redirectTo: () => (inject(BreakpointService).lg() ? 'color-theme' : 'all'),
        pathMatch: 'full',
      },
      {
        path: 'all',
        loadComponent: () =>
          import('./feature/settings/settings.component').then(c => c.SettingsComponent),
      },
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
        redirectTo: 'all',
      },
    ],
  },
];
