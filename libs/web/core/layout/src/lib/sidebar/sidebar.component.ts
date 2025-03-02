import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DividerComponent, NavModule, SkeletonModule } from '@web/shared/ui';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'nt-sidebar',
  imports: [CommonModule, LogoComponent, DividerComponent, NavModule, SkeletonModule],
  template: `
    <aside class="flex h-full w-64 flex-col overflow-y-auto px-4 py-5">
      <nt-logo class="mb-5" />
      <nt-nav class="mb-2">
        <nt-nav-link link="/notes/all" icon="home" label="All notes" />
        <nt-nav-link link="/notes/archived" icon="archive" label="Archived notes" />
      </nt-nav>
      <nt-divider />
      <h3 class="text-preset-4 mb-2 mt-3 px-2 text-neutral-500">Tags</h3>
      @if (!loading()) {
        <nt-nav>
          @for (tag of tags; track tag) {
            <nt-nav-link icon="tag" [link]="'/notes/tags/' + tag" [label]="tag" />
          }
        </nt-nav>
      } @else {
        <nt-skeleton class="mt-2 flex flex-col gap-5">
          <nt-skeleton-item class="h-5 w-1/2" />
          <nt-skeleton-item class="h-5 w-3/4" />
          <nt-skeleton-item class="h-5 w-full" />
          <nt-skeleton-item class="h-5 w-1/2" />
          <nt-skeleton-item class="h-5 w-5/6" />
          <nt-skeleton-item class="h-5 w-1/2" />
          <nt-skeleton-item class="h-5 w-4/6" />
        </nt-skeleton>
      }
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  loading = signal(true);
  tags = [
    'Cooking',
    'Dev',
    'Fitness',
    'Health',
    'Personal',
    'React',
    'Recipes',
    'Shopping',
    'Travel',
    'TypeScript',
  ];

  constructor() {
    setTimeout(() => this.loading.set(false), 1000);
  }
}
