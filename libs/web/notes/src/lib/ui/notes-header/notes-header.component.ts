import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DesktopHeaderComponent } from '@web/core/layout';
import { IconComponent } from '@web/shared/ui';
import { NotesPageType } from '../../types/notes-page-type';
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
        [type]="type()"
        [tag]="tag()"
        [query]="query()"
      />
      <div desktopHeaderActions class="flex items-center gap-4">
        @if (showSearch()) {
          <nt-search-field [query]="query()" class="w-72" />
        }
        <button
          routerLink="/settings"
          class="flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <nt-icon name="settings" size="24" />
        </button>
      </div>
    </nt-desktop-header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesHeaderComponent {
  public type = input.required<NotesPageType>();
  public tag = input<string | null>(null);
  public query = input<string | null>(null);
  public showSearch = input(true);
}
