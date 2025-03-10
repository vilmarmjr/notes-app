import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreakpointService, DividerComponent } from '@web/shared/ui';
import { NotesStore } from '../../store/notes.store';
import { NoteAsideActionsComponent } from '../../ui/note-aside-actions/note-aside-actions.component';
import { NoteBottomActionsComponent } from '../../ui/note-bottom-actions/note-bottom-actions.component';
import { NoteDetailsTableComponent } from '../../ui/note-details-table/note-details-table.component';
import { NoteEditorSkeletonComponent } from '../../ui/note-editor-skeleton/note-editor-skeleton.component';
import { NoteTopActionsComponent } from '../../ui/note-top-actions/note-top-actions.component';

@Component({
  selector: 'nt-note-editor',
  imports: [
    CommonModule,
    DividerComponent,
    NoteAsideActionsComponent,
    NoteTopActionsComponent,
    NoteBottomActionsComponent,
    NoteDetailsTableComponent,
    NoteEditorSkeletonComponent,
  ],
  template: `
    @let note = store.selectedNote();
    <div class="flex h-full min-h-0 w-full">
      <div class="flex flex-1 flex-col gap-4 lg:px-6 lg:py-5">
        @if (!lg() && note) {
          <nt-note-top-actions
            [showArchive]="!note.archived"
            [showRestore]="note.archived"
          />
          <nt-divider />
        }
        @if (store.isLoadingSelectedNote()) {
          <nt-note-editor-skeleton />
        } @else if (note) {
          <h1 class="text-preset-1 dark:text-base-white text-neutral-950">
            {{ note.title }}
          </h1>
          <nt-note-details-table [lastEdited]="note.updatedAt" [tags]="note.tags" />
          <nt-divider />
          <textarea
            [value]="note.content"
            class="bg-base-white h-full w-full resize-none text-neutral-800 outline-0 dark:bg-neutral-950 dark:text-neutral-100"
          ></textarea>
        }
        @if (lg() && !store.isLoadingSelectedNote() && note) {
          <nt-divider />
          <nt-note-bottom-actions />
        }
      </div>
      @if (lg() && !store.isLoadingSelectedNote() && note) {
        <nt-divider direction="vertical" />
        <nt-note-aside-actions
          [showArchive]="!note.archived"
          [showRestore]="note.archived"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent {
  private breakpointService = inject(BreakpointService);
  protected store = inject(NotesStore);
  protected lg = this.breakpointService.lg;
}
