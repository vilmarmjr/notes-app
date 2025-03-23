import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollEndDirective, TagsStore, ThemeStore } from '@web/shared';
import { BreakpointService, DividerComponent } from '@web/ui';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { ContentComponent } from '../content/content.component';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ShellService } from './shell.service';

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
          (ntScrollEnd)="shellService.nextScrollEvent()"
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
  providers: [ThemeStore, TagsStore],
})
export class ShellComponent implements OnInit {
  private themeStore = inject(ThemeStore);
  private breakpointService = inject(BreakpointService);
  protected shellService = inject(ShellService);
  protected lg = this.breakpointService.lg;

  ngOnInit(): void {
    this.themeStore.loadTheme();
  }
}
