import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TagsStore } from '@web/shared/tags';
import { ThemeStore } from '@web/shared/theme';

@Component({
  selector: 'nt-private-shell',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ThemeStore, TagsStore],
})
export class PrivateShellComponent implements OnInit {
  private _themeStore = inject(ThemeStore);

  ngOnInit(): void {
    this._themeStore.loadTheme();
  }
}
