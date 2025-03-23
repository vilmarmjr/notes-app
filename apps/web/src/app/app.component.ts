import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivationEnd, ActivationStart, Router, RouterModule } from '@angular/router';
import { ColorThemeService, FontThemeService, ProgressComponent } from '@web/ui';
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
  private colorThemeService = inject(ColorThemeService);
  private fontThemeService = inject(FontThemeService);
  private router = inject(Router);
  private loading$ = merge(
    this.router.events
      .pipe(filter(event => event instanceof ActivationStart))
      .pipe(map(() => true)),
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .pipe(map(() => false)),
  );

  protected isLoading = toSignal(this.loading$, { initialValue: false });

  constructor() {
    this.colorThemeService.setInitialTheme();
    this.fontThemeService.setInitialTheme();
  }
}
