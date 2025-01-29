import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  template: `
    <app-nx-welcome />
    <router-outlet />
  `,
})
export class AppComponent {
  title = 'web';
}
