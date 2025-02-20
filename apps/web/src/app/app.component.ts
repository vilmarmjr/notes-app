import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorThemeService, FontThemeService } from '@web/shared/ui';

@Component({
  imports: [RouterModule],
  selector: 'nt-root',
  template: `
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _colorThemeService = inject(ColorThemeService);
  private _fontThemeService = inject(FontThemeService);

  constructor() {
    this._colorThemeService.setInitialTheme();
    this._fontThemeService.setInitialTheme();
  }
}
