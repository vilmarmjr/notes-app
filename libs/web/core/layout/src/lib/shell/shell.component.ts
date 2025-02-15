import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointService, DividerComponent } from '@web/shared/ui';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { ContentComponent } from '../content/content.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'nt-shell',
  imports: [
    CommonModule,
    HeaderComponent,
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
          <nt-header />
          <nt-content class="flex-1">
            <router-outlet />
          </nt-content>
        </div>
        <nt-bottom-nav />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private _breakpointService = inject(BreakpointService);
  protected lg = this._breakpointService.lg;
}
