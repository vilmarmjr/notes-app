import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'nt-header',
  imports: [CommonModule, LogoComponent],
  template: `
    <header
      class="-mb-4 w-full bg-neutral-100 px-4 pb-7 pt-3 sm:px-8 sm:pb-8 sm:pt-4 dark:bg-neutral-800"
    >
      <nt-logo />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
