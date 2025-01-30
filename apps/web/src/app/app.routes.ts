import { Route } from '@angular/router';
import { LoginComponent } from '@frontend-mentor-notes/web/auth';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
