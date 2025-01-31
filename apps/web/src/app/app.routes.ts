import { Route } from '@angular/router';
import { LoginComponent } from '@web/auth';
import { NotesComponent } from '@web/notes';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent },
];
