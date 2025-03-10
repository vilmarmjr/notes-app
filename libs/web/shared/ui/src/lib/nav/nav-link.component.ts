import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  Params,
  QueryParamsHandling,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { IconComponent, IconName } from '../icon/icon.component';

@Component({
  selector: 'nt-nav-link',
  imports: [CommonModule, IconComponent, RouterLink, RouterLinkActive],
  template: `
    <li>
      <a
        #rla="routerLinkActive"
        class="flex h-10 items-center gap-2 rounded-lg px-3 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
        routerLinkActive="!bg-neutral-100 !text-neutral-950 dark:!bg-neutral-800 dark:!text-base-white"
        [routerLink]="link()"
        [queryParams]="queryParams()"
        [queryParamsHandling]="queryParamsHandling()"
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
export class NavLinkComponent {
  public link = input.required<string>();
  public icon = input.required<IconName>();
  public label = input.required<string>();
  public queryParams = input<Params | null>(null);
  public queryParamsHandling = input<QueryParamsHandling>('replace');
}
