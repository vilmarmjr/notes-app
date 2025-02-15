import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BreakpointService,
  ButtonDirective,
  DividerComponent,
  IconComponent,
} from '@web/shared/ui';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';
import { NoteActionsComponent } from '../../ui/note-actions/note-actions.component';
import { NotesHeaderComponent } from '../../ui/notes-header/notes-header.component';
import { NotesListComponent } from '../../ui/notes-list/notes-list.component';

@Component({
  selector: 'nt-notes',
  imports: [
    CommonModule,
    CreateNoteButtonComponent,
    NotesListComponent,
    NotesHeaderComponent,
    DividerComponent,
    IconComponent,
    NoteActionsComponent,
    ButtonDirective,
  ],
  template: `
    @if (lg()) {
      <div class="flex h-full flex-col">
        <nt-notes-header />
        <nt-divider />
        <div class="flex min-h-0 flex-1">
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
    } @else {
      <h1 class="text-preset-1 dark:text-base-white mb-4 text-neutral-950">All Notes</h1>
      <nt-notes-list />
      <nt-create-note-button class="fixed bottom-20 right-5 sm:bottom-28 sm:right-8" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  private _breakpointService = inject(BreakpointService);
  protected lg = this._breakpointService.lg;
}
