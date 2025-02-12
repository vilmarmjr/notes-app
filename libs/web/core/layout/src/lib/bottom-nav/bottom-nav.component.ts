import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerComponent, IconComponent, IconName } from '@web/shared/ui';
import { cva } from 'class-variance-authority';

const anchorVariants = cva(
  'flex flex-col items-center gap-1 rounded-md px-4 py-1 transition-colors',
  {
    variants: {
      selected: {
        false:
          'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-50 dark:hover:text-neutral-600',
        true: 'bg-blue-50 text-blue-500 hover:bg-neutral-200',
      },
    },
  },
);

@Component({
  selector: 'nt-bottom-nav',
  imports: [CommonModule, RouterLink, DividerComponent, IconComponent],
  template: `
    <nav class="shadow-sm">
      <ul
        class="flex justify-around border-t border-neutral-200 px-4 py-3 sm:px-8 dark:border-neutral-800 dark:bg-neutral-950"
      >
        @for (item of items; track item.routerLink; let last = $last) {
          <li>
            <a [routerLink]="item.routerLink" [class]="item.class">
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
      routerLink: '/notes',
      class: anchorVariants({ selected: true }),
    },
    {
      label: 'Search',
      icon: 'search',
      routerLink: '/search',
      class: anchorVariants({ selected: false }),
    },
    {
      label: 'Archived',
      icon: 'archive',
      routerLink: '/archived',
      class: anchorVariants({ selected: false }),
    },
    {
      label: 'Tags',
      icon: 'tag',
      routerLink: '/tags',
      class: anchorVariants({ selected: false }),
    },
    {
      label: 'Settings',
      icon: 'settings',
      routerLink: '/settings',
      class: anchorVariants({ selected: false }),
    },
  ] satisfies Array<{
    label: string;
    routerLink: string;
    icon: IconName;
    class: string;
  }>;
}
