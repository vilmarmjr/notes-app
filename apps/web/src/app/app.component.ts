import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivationEnd, ActivationStart, Router, RouterModule } from '@angular/router';
import { ColorThemeService, FontThemeService, ProgressComponent } from '@web/shared/ui';
import { filter, map, merge } from 'rxjs';

@Component({
  imports: [RouterModule, ProgressComponent],
  selector: 'nt-root',
  template: `
    @if (isLoading()) {
      <nt-progress class="fixed left-0 right-0 top-0 rounded-none" />
    }
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _colorThemeService = inject(ColorThemeService);
  private _fontThemeService = inject(FontThemeService);
  private _router = inject(Router);
  private _loading$ = merge(
    this._router.events
      .pipe(filter(event => event instanceof ActivationStart))
      .pipe(map(() => true)),
    this._router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .pipe(map(() => false)),
  );

  protected isLoading = toSignal(this._loading$, { initialValue: false });

  constructor() {
    this._colorThemeService.setInitialTheme();
    this._fontThemeService.setInitialTheme();
  }
}
