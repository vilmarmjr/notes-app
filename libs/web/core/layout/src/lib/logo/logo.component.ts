import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '@web/shared/ui';

@Component({
  selector: 'nt-logo',
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <img [ngSrc]="src()" height="28" width="96" alt="Notes App Logo" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private _themeService = inject(ThemeService);

  private _isDarkTheme = this._themeService.isDarkTheme;
  protected src = computed(() =>
    this._isDarkTheme() ? 'assets/img/logo-dark.svg' : 'assets/img/logo-light.svg',
  );
}
