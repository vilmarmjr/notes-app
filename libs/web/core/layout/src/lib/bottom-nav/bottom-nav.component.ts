import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DividerComponent, IconComponent, IconName } from '@web/shared/ui';

@Component({
  selector: 'nt-bottom-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive, DividerComponent, IconComponent],
  template: `
    <nav class="shadow-sm">
      <ul
        class="bg-base-white flex justify-around border-t border-neutral-200 px-4 py-3 sm:px-8 dark:border-neutral-800 dark:bg-neutral-950"
      >
        @for (item of items; track item.routerLink; let last = $last) {
          <li>
            <a
              [routerLink]="item.routerLink"
              class="flex flex-col items-center gap-1 rounded-md px-4 py-1 text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-50 dark:hover:text-neutral-600"
              routerLinkActive="!bg-blue-50 !text-blue-500 !hover:bg-neutral-200"
            >
              <nt-icon size="24" [name]="item.icon" />
              <span class="text-preset-6 hidden sm:inline">{{ item.label }}</span>
            </a>
          </li>
          @if (!last) {
            <div class="hidden sm:flex">
              <nt-divider direction="vertical" />
            </div>
          }
        }
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent {
  items = [
    {
      label: 'Home',
      icon: 'home',
      routerLink: '/notes/all',
    },
    {
      label: 'Search',
      icon: 'search',
      routerLink: '/notes/search',
    },
    {
      label: 'Archived',
      icon: 'archive',
      routerLink: '/notes/archived',
    },
    {
      label: 'Tags',
      icon: 'tag',
      routerLink: '/notes/tags',
    },
    {
      label: 'Settings',
      icon: 'settings',
      routerLink: '/settings',
    },
  ] satisfies Array<{
    label: string;
    routerLink: string;
    icon: IconName;
  }>;
}
