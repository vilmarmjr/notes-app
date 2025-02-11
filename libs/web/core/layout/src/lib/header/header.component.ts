import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'n-header',
  imports: [CommonModule, LogoComponent],
  template: `
    <header class="-mb-4 w-full bg-neutral-100 px-8 pb-8 pt-4 dark:bg-neutral-800">
      <n-logo />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
