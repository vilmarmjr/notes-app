import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'nt-mobile-header',
  imports: [CommonModule, LogoComponent],
  template: `
    <header class="w-full bg-neutral-100 p-4 sm:px-8 sm:py-4 dark:bg-neutral-800">
      <nt-logo />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHeaderComponent {}
