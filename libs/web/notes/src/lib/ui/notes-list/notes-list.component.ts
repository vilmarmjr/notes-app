import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QueryParamsHandling, RouterLink, RouterLinkActive } from '@angular/router';
import { PaginateNotesResponseItemDto } from '@common/models';
import { NotesFilter } from '@web/shared';
import { DividerComponent } from '@web/ui';
import { NotesEmptyComponent } from '../notes-empty/notes-empty.component';

@Component({
  selector: 'nt-notes-list',
  imports: [
    CommonModule,
    DividerComponent,
    RouterLink,
    RouterLinkActive,
    NotesEmptyComponent,
  ],
  template: `
    <ul class="flex flex-col gap-1">
      @if (includeUntitledNote()) {
        <li>
          <a
            class="flex flex-col gap-3 rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            routerLinkActive="!bg-neutral-100 dark:!bg-neutral-800"
            [routerLink]="routerLink"
            [queryParams]="{ note: 'new' }"
            [queryParamsHandling]="queryParamsHandling"
          >
            <h2 class="text-preset-3 dark:text-base-white text-neutral-950">
              Untitled Note
            </h2>
          </a>
        </li>
      }
      @for (note of notes(); track note.id; let last = $last) {
        <li>
          <a
            class="flex flex-col gap-3 rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            routerLinkActive="!bg-neutral-100 dark:!bg-neutral-800"
            [routerLink]="routerLink"
            [queryParams]="{ note: note.id }"
            [queryParamsHandling]="queryParamsHandling"
          >
            <h2 class="text-preset-3 dark:text-base-white text-neutral-950">
              {{ note.title }}
            </h2>
            @if (note.tags.length) {
              <div class="flex flex-wrap gap-1">
                @for (tag of note.tags; track tag) {
                  <span
                    class="text-preset-6 dark:text-base-white rounded-md bg-neutral-200 px-2 py-1 text-neutral-950 dark:bg-neutral-600"
                  >
                    {{ tag }}
                  </span>
                }
              </div>
            }
            @if (note.createdAt) {
              <p class="text-preset-6 text-neutral-700 dark:text-neutral-300">
                {{ note.createdAt | date }}
              </p>
            }
          </a>
        </li>
        @if (!last) {
          <nt-divider />
        }
      } @empty {
        <nt-notes-empty [filter]="filter()" />
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
  public filter = input.required<NotesFilter>();
  public notes = input.required<PaginateNotesResponseItemDto[]>();
  public includeUntitledNote = input(false);
  protected readonly queryParamsHandling: QueryParamsHandling = 'merge';
  protected readonly routerLink = ['.'];
}
