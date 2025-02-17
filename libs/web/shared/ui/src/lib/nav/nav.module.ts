import { NgModule } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import { NavLinkComponent } from './nav-link.component';
import { NavComponent } from './nav.component';

@NgModule({
  imports: [NavComponent, NavButtonComponent, NavLinkComponent],
  exports: [NavComponent, NavButtonComponent, NavLinkComponent],
})
export class NavModule {}
