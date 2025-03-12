import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ColorThemeService } from '@web/shared/ui';

@Component({
  selector: 'nt-logo',
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <img [ngSrc]="src()" height="28" width="96" alt="Notes App Logo" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private colorThemeService = inject(ColorThemeService);

  private isDarkTheme = this.colorThemeService.isDarkTheme;
  protected src = computed(() =>
    this.isDarkTheme() ? 'assets/img/logo-dark.svg' : 'assets/img/logo-light.svg',
  );
}
