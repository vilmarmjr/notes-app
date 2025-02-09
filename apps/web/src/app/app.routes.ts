import { Route } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  ResetPasswordComponent,
  SignupComponent,
} from '@web/auth';
import { NotesComponent } from '@web/notes';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'notes', component: NotesComponent },
];
