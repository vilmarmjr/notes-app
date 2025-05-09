import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DesktopHeaderComponent } from '@web/core';
import { NotesFilter } from '@web/shared';
import { IconComponent } from '@web/ui';
import { NotesTitleComponent } from '../notes-title/notes-title.component';
import { SearchFieldComponent } from '../search-field/search-field.component';

@Component({
  selector: 'nt-notes-header',
  imports: [
    CommonModule,
    IconComponent,
    NotesTitleComponent,
    SearchFieldComponent,
    RouterLink,
    DesktopHeaderComponent,
  ],
  template: `
    <nt-desktop-header>
      <nt-notes-title
        desktopHeaderTitle
        [filter]="filter()"
        [tag]="tag()"
        [query]="query()"
      />
      <div desktopHeaderActions class="flex items-center gap-4">
        @if (showSearch()) {
          <nt-search-field
            [query]="query()"
            (queryChange)="queryChange.emit($event)"
            class="w-72"
          />
        }
        <a
          routerLink="/settings"
          class="flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <nt-icon name="settings" size="24" />
        </a>
      </div>
    </nt-desktop-header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesHeaderComponent {
  public filter = input.required<NotesFilter>();
  public tag = input<string | null>(null);
  public query = input('');
  public queryChange = output<string>();
  public showSearch = input(true);
}
