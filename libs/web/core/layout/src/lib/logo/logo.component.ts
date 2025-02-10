import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '@web/shared/ui';

@Component({
  selector: 'n-logo',
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <img
      [ngSrc]="
        theme() === 'dark' ? 'assets/img/logo-dark.svg' : 'assets/img/logo-light.svg'
      "
      height="28"
      width="96"
      alt="Notes App Logo"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private _themeService = inject(ThemeService);

  protected theme = this._themeService.theme;
}
