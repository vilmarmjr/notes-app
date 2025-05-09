import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent, IconName } from '@web/ui';

@Component({
  selector: 'nt-sidebar-item',
  imports: [CommonModule, IconComponent, RouterLink, RouterLinkActive],
  template: `
    <li>
      <a
        #rla="routerLinkActive"
        class="flex h-10 items-center gap-2 rounded-lg px-3 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
        routerLinkActive="!bg-neutral-100 !text-neutral-950 dark:!bg-neutral-800 dark:!text-base-white"
        [routerLink]="link()"
      >
        <nt-icon [name]="icon()" [class]="rla.isActive ? 'text-blue-500' : ''" />
        <span class="text-preset-4">{{ label() }}</span>
        @if (rla.isActive) {
          <nt-icon name="chevronRight" size="24" class="ml-auto" />
        }
      </a>
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  public link = input.required<string>();
  public icon = input.required<IconName>();
  public label = input.required<string>();
}
