import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '@web/core/layout';
import { ButtonDirective, DividerComponent, IconComponent } from '@web/shared/ui';
import { NoteActionsComponent } from '../../ui/notes-actions/note-actions.component';
import { NotesHeaderComponent } from '../../ui/notes-header/notes-header.component';
import { NotesListComponent } from '../../ui/notes-list/notes-list.component';

@Component({
  selector: 'nt-notes-desktop',
  imports: [
    CommonModule,
    SidebarComponent,
    NotesHeaderComponent,
    ButtonDirective,
    IconComponent,
    NotesListComponent,
    DividerComponent,
    NoteActionsComponent,
  ],
  template: `
    <div class="bg-base-white flex h-full w-full dark:bg-neutral-950">
      <nt-sidebar />
      <nt-divider direction="vertical" />
      <div class="flex flex-1 flex-col">
        <nt-notes-header />
        <nt-divider />
        <div class="flex h-full">
          <div class="flex w-72 flex-col overflow-y-auto px-4 py-5">
            <button ntButton class="mb-4">
              <nt-icon name="plus" />
              Create new note
            </button>
            <nt-notes-list />
          </div>
          <nt-divider direction="vertical" />
          <div class="flex-1">Main content</div>
          <nt-divider direction="vertical" />
          <nt-note-actions />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesDesktopComponent {}
