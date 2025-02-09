import { Route } from '@angular/router';
import { ForgotPasswordComponent, LoginComponent } from '@web/auth';
import { NotesComponent } from '@web/notes';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'notes', component: NotesComponent },
];
