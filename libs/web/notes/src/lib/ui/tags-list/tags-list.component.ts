import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerComponent, IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-tags-list',
  imports: [CommonModule, RouterLink, IconComponent, DividerComponent],
  template: `
    <ul>
      @for (tag of tags; track tag; let last = $last) {
        <li class="flex justify-start">
          <a
            [routerLink]="['/notes/tags', tag]"
            class="text-preset-4 flex items-center gap-2 py-3 text-neutral-700 hover:underline dark:text-neutral-300"
          >
            <nt-icon name="tag" />
            {{ tag }}
          </a>
        </li>
        @if (!last) {
          <nt-divider />
        }
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
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
