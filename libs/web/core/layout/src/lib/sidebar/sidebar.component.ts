import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerComponent } from '@web/shared/ui';
import { LogoComponent } from '../logo/logo.component';
import { SidebarItemComponent } from './sidebar-item.component';

@Component({
  selector: 'nt-sidebar',
  imports: [CommonModule, LogoComponent, DividerComponent, SidebarItemComponent],
  template: `
    <aside class="flex h-full w-64 flex-col overflow-y-auto px-4 py-5">
      <nt-logo class="mb-5" />
      <ul class="mb-2 flex flex-col gap-1">
        <nt-sidebar-item link="/notes/all" icon="home" label="All notes" />
        <nt-sidebar-item link="/notes/archived" icon="archive" label="Archived notes" />
      </ul>
      <nt-divider />
      <h3 class="text-preset-4 mb-2 mt-3 px-2 text-neutral-500">Tags</h3>
      <ul class="flex flex-col gap-1">
        @for (tag of tags; track tag) {
          <nt-sidebar-item icon="tag" [link]="'/notes/tags/' + tag" [label]="tag" />
        }
      </ul>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
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
}
