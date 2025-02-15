import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DividerComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-notes-list',
  imports: [CommonModule, DividerComponent, RouterLink, RouterLinkActive],
  template: `
    <ul class="flex flex-col gap-1">
      @for (item of items; track item.id; let last = $last) {
        <li>
          <a
            class="flex flex-col gap-3 rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            routerLinkActive="!bg-neutral-100 dark:!bg-neutral-800"
            [routerLink]="['.']"
            [queryParams]="{ note: item.id }"
          >
            <h2 class="text-preset-3 dark:text-base-white text-neutral-950">
              {{ item.title }}
            </h2>
            <div class="flex flex-wrap gap-1">
              @for (tag of item.tags; track tag) {
                <span
                  class="text-preset-6 dark:text-base-white rounded-md bg-neutral-200 px-2 py-1 text-neutral-950 dark:bg-neutral-600"
                >
                  {{ tag }}
                </span>
              }
            </div>
            <p class="text-preset-6 text-neutral-700 dark:text-neutral-300">
              {{ item.date }}
            </p>
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
export class NotesListComponent {
  items = [
    {
      id: '1',
      title: 'React Performance Optimization',
      tags: ['Dev', 'React'],
      date: '29 Oct 2024',
    },
    {
      id: '2',
      title: 'Japan Travel Planning',
      tags: ['Travel', 'Personal'],
      date: '28 Oct 2024',
    },
    {
      id: '3',
      title: 'Favorite Pasta Recipes',
      tags: ['Cooking', 'Recipes'],
      date: '27 Oct 2024',
    },
    {
      id: '4',
      title: 'Weekly Workout Plan',
      tags: ['Dev', 'React'],
      date: '25 Oct 2024',
    },
    {
      id: '5',
      title: 'Meal Prep Ideas',
      tags: ['Cooking', 'Health', 'Recipes'],
      date: '12 Oct 2024',
    },
  ];
}
