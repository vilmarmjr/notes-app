import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollEndDirective } from '@web/shared';
import { BreakpointService, DividerComponent } from '@web/ui';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { ContentComponent } from '../content/content.component';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'nt-layout-shell',
  imports: [
    CommonModule,
    MobileHeaderComponent,
    ContentComponent,
    BottomNavComponent,
    SidebarComponent,
    DividerComponent,
    RouterModule,
    ScrollEndDirective,
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
        <div
          class="flex flex-1 flex-col overflow-y-auto"
          (ntScrollEnd)="scrollEnd.emit()"
        >
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
})
export class LayoutShellComponent {
  private breakpointService = inject(BreakpointService);
  protected lg = this.breakpointService.lg;
  public scrollEnd = output<void>();
}
