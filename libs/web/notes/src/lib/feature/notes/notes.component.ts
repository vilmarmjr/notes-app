import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BottomNavComponent, ContentComponent, HeaderComponent } from '@web/core/layout';
import { DividerComponent } from '@web/shared/ui';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';

@Component({
  selector: 'n-notes',
  imports: [
    CommonModule,
    HeaderComponent,
    DividerComponent,
    ContentComponent,
    BottomNavComponent,
    CreateNoteButtonComponent,
  ],
  template: `
    <div class="flex h-full flex-col">
      <n-header />
      <n-content class="relative flex-1">
        <h1 class="text-preset-1 dark:text-base-white mb-4 text-neutral-950">
          All Notes
        </h1>
        <ul>
          @for (item of items; track $index; let last = $last) {
            <li class="flex flex-col gap-3 rounded-md p-2">
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
            </li>
            @if (!last) {
              <n-divider />
            }
          }
        </ul>
        <n-create-note-button class="absolute bottom-4 right-4 sm:bottom-8 sm:right-8" />
      </n-content>
      <n-bottom-nav />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  items = [
    {
      title: 'React Performance Optimization',
      tags: ['Dev', 'React'],
      date: '29 Oct 2024',
    },
    {
      title: 'Japan Travel Planning',
      tags: ['Travel', 'Personal'],
      date: '28 Oct 2024',
    },
    {
      title: 'Favorite Pasta Recipes',
      tags: ['Cooking', 'Recipes'],
      date: '27 Oct 2024',
    },
    {
      title: 'Weekly Workout Plan',
      tags: ['Dev', 'React'],
      date: '25 Oct 2024',
    },
    {
      title: 'Meal Prep Ideas',
      tags: ['Cooking', 'Health', 'Recipes'],
      date: '12 Oct 2024',
    },
    {
      title: 'Reading List',
      tags: ['Personal', 'Dev'],
      date: '05 Oct 2024',
    },
    {
      title: 'Fitness Goals 2023',
      tags: ['Fitness', 'Health', 'Personal'],
      date: '22 Sep 2024',
    },
  ];
}
