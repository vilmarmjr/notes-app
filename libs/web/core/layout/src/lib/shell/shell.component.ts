import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeStore } from '@web/shared/theme';
import { BreakpointService, DividerComponent } from '@web/shared/ui';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { ContentComponent } from '../content/content.component';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'nt-shell',
  imports: [
    CommonModule,
    MobileHeaderComponent,
    ContentComponent,
    BottomNavComponent,
    SidebarComponent,
    DividerComponent,
    RouterModule,
  ],
  template: `
    @if (lg()) {
      <div class="bg-base-white flex h-full w-full dark:bg-neutral-950">
        <nt-sidebar />
        <nt-divider direction="vertical" />
        <div class="h-full flex-1">
          <router-outlet />
        </div>
      </div>
    } @else {
      <div class="flex h-full flex-col">
        <div class="flex flex-1 flex-col overflow-y-auto">
          <nt-mobile-header />
          <nt-content class="flex-1">
            <router-outlet />
          </nt-content>
        </div>
        <nt-bottom-nav />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ThemeStore],
})
export class ShellComponent implements OnInit {
  private _breakpointService = inject(BreakpointService);
  private _themeStore = inject(ThemeStore);
  protected lg = this._breakpointService.lg;

  ngOnInit(): void {
    this._themeStore.loadTheme();
  }
}
