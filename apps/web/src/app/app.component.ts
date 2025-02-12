import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@web/shared/ui';

@Component({
  imports: [RouterModule],
  selector: 'nt-root',
  template: `
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _themeService = inject(ThemeService);

  constructor() {
    this._themeService.setInitialTheme();
  }
}
